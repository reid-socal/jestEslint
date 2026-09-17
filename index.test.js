const { capitalizeWords, filterActiveUsers, logAction } = require("./functions");

describe("capitalizeWords", () => {
  test("capitalizes each word in a normal sentence", () => {
    expect(capitalizeWords("hello world")).toBe("Hello World");
  });

  test("returns an empty string when given an empty string", () => {
    expect(capitalizeWords("")).toBe("");
  });

  test("capitalizes only the letter before the hyphen, not after", () => {
    expect(capitalizeWords("hello-world")).toBe("Hello-world");
  });

  test("capitalizes a single word", () => {
    expect(capitalizeWords("hello")).toBe("Hello");
  });

  test("handles multiple spaces between words", () => {
    expect(capitalizeWords("hello  world")).toBe("Hello  World");
  });
});

describe("filterActiveUsers", () => {
  test("returns only active users from a mixed array", () => {
    const users = [
      { name: "Alice", isActive: true },
      { name: "Bob", isActive: false },
      { name: "Carol", isActive: true },
    ];
    expect(filterActiveUsers(users)).toEqual([
      { name: "Alice", isActive: true },
      { name: "Carol", isActive: true },
    ]);
  });

  test("returns an empty array when all users are inactive", () => {
    const users = [
      { name: "Bob", isActive: false },
      { name: "Dave", isActive: false },
    ];
    expect(filterActiveUsers(users)).toEqual([]);
  });

  test("returns an empty array when given an empty array", () => {
    expect(filterActiveUsers([])).toEqual([]);
  });
});

describe("logAction", () => {
  const FIXED_ISO = "2024-11-27T12:00:00.000Z";

  beforeEach(() => {
    jest.spyOn(console, "log").mockImplementation(() => {});
    jest.spyOn(Date.prototype, "toISOString").mockReturnValue(FIXED_ISO);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("generates the correct log string for valid inputs", () => {
    const result = logAction("login", "Alice");
    expect(result).toBe(`User Alice performed login at ${FIXED_ISO}`);
    expect(console.log).toHaveBeenCalledWith(result);
  });

  test("falls back to placeholder text when action is missing", () => {
    const result = logAction(undefined, "Alice");
    expect(result).toBe(`User Alice performed unknown action at ${FIXED_ISO}`);
  });

  test("falls back to placeholder text when username is missing", () => {
    const result = logAction("login", undefined);
    expect(result).toBe(`User unknown user performed login at ${FIXED_ISO}`);
  });

  test("treats empty strings as missing input", () => {
    const result = logAction("", "");
    expect(result).toBe(`User unknown user performed unknown action at ${FIXED_ISO}`);
  });
});