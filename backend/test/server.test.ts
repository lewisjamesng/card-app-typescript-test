import { server } from "../src/server";

const createEntryAndGetId = async () => {
  const entryData = {
    scheduled_at: new Date(),
    created_at: new Date(),
    title: "Test Entry",
    description: "Test Description",
  };

  const response = await server.inject({
    method: "POST",
    url: "/create/",
    payload: entryData,
  });

  return JSON.parse(response.payload).id;
};

const deleteEntryById = async (id: string) => {
  await server.inject({
    method: "DELETE",
    url: `/delete/${id}`,
  });
};

describe("Card App Endpoints", () => {
  let entryId: string;

  beforeAll(async () => {
    // Create an entry and get its ID before running the tests
    entryId = await createEntryAndGetId();
  });

  afterAll(async () => {
    // Clean up the created entry after all tests are done
    await deleteEntryById(entryId);
  });

  it("should retrieve all entries", async () => {
    const response = await server.inject({
      method: "GET",
      url: "/get/",
    });

    expect(response.statusCode).toBe(200);
    expect(JSON.parse(response.payload)).toBeInstanceOf(Array);
  });

  it("should retrieve a specific entry by ID", async () => {
    const response = await server.inject({
      method: "GET",
      url: `/get/${entryId}`,
    });

    expect(response.statusCode).toBe(200);
    expect(JSON.parse(response.payload)).toBeDefined();
  });

  it("should create a new entry", async () => {
    const entryData = {
      scheduled_at: new Date(),
      created_at: new Date(),
      title: "New Entry",
      description: "New Description",
    };

    const response = await server.inject({
      method: "POST",
      url: "/create/",
      payload: entryData,
    });

    expect(response.statusCode).toBe(200);
    expect(JSON.parse(response.payload)).toBeDefined();

    deleteEntryById(JSON.parse(response.payload).id);
  });

  it("should update an existing entry", async () => {
    const updatedEntryData = {
      scheduled_at: new Date(),
      created_at: new Date(),
      title: "Updated Entry",
      description: "Updated Description",
    };

    const response = await server.inject({
      method: "PUT",
      url: `/update/${entryId}`,
      payload: updatedEntryData,
    });

    expect(response.statusCode).toBe(200);

    // Retrieve the updated entry to verify the changes
    const getUpdatedEntryResponse = await server.inject({
      method: "GET",
      url: `/get/${entryId}`,
    });

    const updatedEntry = JSON.parse(getUpdatedEntryResponse.payload);

    // Check that each field has been updated
    expect(updatedEntry.scheduled_at).toEqual(updatedEntryData.scheduled_at.toISOString());
    expect(updatedEntry.created_at).toEqual(updatedEntryData.created_at.toISOString());
    expect(updatedEntry.title).toBe(updatedEntryData.title);
    expect(updatedEntry.description).toBe(updatedEntryData.description);
  });

  it("should delete an entry by ID", async () => {
    const response = await server.inject({
      method: "DELETE",
      url: `/delete/${entryId}`,
    });

    expect(response.statusCode).toBe(200);
    expect(JSON.parse(response.payload)).toBeDefined();
  });
});
