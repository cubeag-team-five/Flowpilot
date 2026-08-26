package com.flowpilot.flowpilot.scrummaster.service;

import java.io.InputStream;

/**
 * Where attachment bytes live.
 *
 * The SRS names S3 or MinIO, neither of which exists in this project yet, so
 * the seam is defined here and a local-disk implementation satisfies it. When
 * object storage arrives it is one new class implementing this interface — no
 * change to the entity, the service, the controller or the schema, because
 * `key` is opaque to all of them.
 */
public interface ScrumAttachmentStorage {

    /** Stores the bytes and returns the key needed to read them back. */
    String store(String suggestedName, byte[] content);

    byte[] read(String key);

    /** Removing storage that is already gone is not an error. */
    void delete(String key);
}
