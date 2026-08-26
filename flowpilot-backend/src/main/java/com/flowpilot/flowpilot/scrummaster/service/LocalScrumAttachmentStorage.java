package com.flowpilot.flowpilot.scrummaster.service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.flowpilot.flowpilot.scrummaster.exception.ScrumNotFoundException;
import com.flowpilot.flowpilot.scrummaster.exception.ScrumValidationException;

/**
 * Local-disk attachment storage.
 *
 * The key is a generated UUID plus a sanitised extension — never the uploaded
 * filename. A client-supplied name can contain "../", a null byte or an
 * absolute path, any of which would let an upload escape the storage directory
 * and write somewhere it should not. The original name is kept as metadata on
 * the entity instead, purely for display.
 */
@Service
public class LocalScrumAttachmentStorage implements ScrumAttachmentStorage {

    private final Path root;

    public LocalScrumAttachmentStorage(
            @Value("${scrummaster.attachments.dir:${user.home}/.flowpilot/scrum-attachments}")
            String directory
    ) {
        this.root = Paths.get(directory).toAbsolutePath().normalize();

        try {
            Files.createDirectories(this.root);
        } catch (IOException ex) {
            throw new IllegalStateException(
                    "Could not create the attachment directory at " + this.root, ex);
        }
    }


    @Override
    public String store(String suggestedName, byte[] content) {

        if (content == null || content.length == 0) {
            throw new ScrumValidationException("An empty file cannot be attached");
        }

        String key = UUID.randomUUID() + extensionOf(suggestedName);
        Path target = resolve(key);

        try {
            Files.write(target, content);
        } catch (IOException ex) {
            throw new IllegalStateException("Could not store the attachment", ex);
        }

        return key;
    }


    @Override
    public byte[] read(String key) {

        Path source = resolve(key);

        if (!Files.exists(source)) {
            throw new ScrumNotFoundException(
                    "The stored file for this attachment is missing");
        }

        try {
            return Files.readAllBytes(source);
        } catch (IOException ex) {
            throw new IllegalStateException("Could not read the attachment", ex);
        }
    }


    @Override
    public void delete(String key) {

        try {
            Files.deleteIfExists(resolve(key));
        } catch (IOException ex) {
            // The database row is going regardless; a leftover file is not
            // worth failing the request over, but it should be visible.
            throw new IllegalStateException("Could not delete the stored attachment", ex);
        }
    }


    /**
     * Resolves a key inside the storage root and proves it stayed there.
     * Belt and braces: keys are generated, but a future caller might not be.
     */
    private Path resolve(String key) {

        if (key == null || key.isBlank()) {
            throw new ScrumValidationException("A storage key is required");
        }

        Path candidate = this.root.resolve(key).normalize();

        if (!candidate.startsWith(this.root)) {
            throw new ScrumValidationException("That storage key is not valid");
        }

        return candidate;
    }

    /** Keeps a short, safe extension so downloads open in the right app. */
    private String extensionOf(String name) {

        if (name == null) {
            return "";
        }

        int dot = name.lastIndexOf('.');

        if (dot < 0 || dot == name.length() - 1) {
            return "";
        }

        String raw = name.substring(dot + 1).toLowerCase();

        // Letters and digits only: anything else has no business in a path
        if (!raw.matches("[a-z0-9]{1,8}")) {
            return "";
        }

        return "." + raw;
    }
}
