import { server } from "../src/server"
import Prisma from "../src/db";

describe("server test", () => {
  it("should assert 1 + 1 is 2", () => {
    expect(1 + 1).toEqual(2);
  });
});

// Checks if a new entry is created 
describe("create entry", () => {
  it("should create a new entry", async () => {
    const newEntry = {
      title: "Entry Created",
      description: "Description of entry created",
      created_at: new Date().toISOString(),
      scheduledDate: new Date().toISOString(),
    };

    const response = await server.inject({
      method: "POST",
      url: "/create/",
      payload: newEntry,
    });

    expect(response.statusCode).toBe(200);

    const createdEntry = response.json();
    expect(createdEntry).toMatchObject({ title: newEntry.title, description: newEntry.description });

    await Prisma.entry.delete({ where: { id: createdEntry.id } });
  });
});

// Checks if an entry is deleted successfully
describe("delete entry", () => {
  it("should delete an entry", async () => {
    const mockEntry = await Prisma.entry.create({
      data: {
        title: "Entry to delete",
        description: "Description of entry to delete",
        created_at: new Date(),
        scheduledDate: new Date(),
      },
    });

    const response = await server.inject({
      method: "DELETE",
      url: `/delete/${mockEntry.id}`,
    });

    expect(response.statusCode).toBe(200);
    const result = response.json();
    expect(result).toHaveProperty("msg", "Deleted successfully");

    const deletedEntry = await Prisma.entry.findUnique({ where: { id: mockEntry.id } });
    expect(deletedEntry).toBeNull();
  });
});

// Checks if an entry is updated correctly 
describe("update entry", () => {
  it("should update an entry", async () => {
    const mockEntry = await Prisma.entry.create({
      data: {
        title: "Entry to update",
        description: "Description of entry to update",
        created_at: new Date(),
        scheduledDate: new Date(),
      },
    });

    const updatedEntry = {
      title: "Updated Title",
      description: "Updated description",
    };

    const response = await server.inject({
      method: "PUT",
      url: `/update/${mockEntry.id}`,
      payload: updatedEntry,
    });

    expect(response.statusCode).toBe(200);
    const result = response.json();
    expect(result).toHaveProperty("msg", "Updated successfully");

    const checkEntry = await Prisma.entry.findUnique({ where: { id: mockEntry.id } });
    expect(checkEntry).not.toBeNull();
    expect(checkEntry).toMatchObject(updatedEntry);

    await Prisma.entry.delete({ where: { id: mockEntry.id } });
  });
});

// Checks if all entries are retrieved 
describe("get all entries", () => {
  it("should retrieve all entries", async () => {
    const response = await server.inject({
      method: "GET",
      url: "/get/",
    });

    expect(response.statusCode).toBe(200);
    const entries = response.json();
    expect(Array.isArray(entries)).toBeTruthy();
    expect(entries.length).toBeGreaterThanOrEqual(0);
  });
});

// Checks if a specific entry is retrieved by id
describe("get entry by id", () => {
  it("should retrieve an entry by id", async () => {
    const mockEntry = await Prisma.entry.create({
      data: {
        title: "Entry to retrieve",
        description: "Description of entry to retrieve",
        created_at: new Date(),
        scheduledDate: new Date(),
      },
    });

    const response = await server.inject({
      method: "GET",
      url: `/get/${mockEntry.id}`,
    });

    expect(response.statusCode).toBe(200);
    const entry = response.json();
    expect(entry).toMatchObject({ id: mockEntry.id, title: "Entry to retrieve", description: "Description of entry to retrieve" });

    await Prisma.entry.delete({ where: { id: mockEntry.id } });
  });
});