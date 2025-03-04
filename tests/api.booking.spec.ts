import { test, expect, APIRequestContext } from "@playwright/test";
import { Booking } from "../lib/booking";

const API_BASE_URL = "https://automationintesting.online/";

test.describe("booking/ GET requests", () => {
  let cookies = "";

  test.beforeAll(async ({ request }: { request: APIRequestContext }) => {
    cookies = await getAuthCookies(request);
  });

  test("GET booking summary with specific room id", async ({ request }: { request: APIRequestContext }) => {
    await test.step("Fetch booking summary", async () => {
      const response = await request.get(API_BASE_URL + "booking/summary?roomid=1");

      expect(response.status()).toBe(200);
      const body = await response.json();
      expect(body.bookings.length).toBeGreaterThanOrEqual(1);
      expect(isValidDate(body.bookings[0].bookingDates.checkin)).toBe(true);
      expect(isValidDate(body.bookings[0].bookingDates.checkout)).toBe(true);
    });
  });

  test("GET all bookings with details", async ({ request }: { request: APIRequestContext }) => {
    await test.step("Fetch all bookings", async () => {
      const response = await request.get(API_BASE_URL + "booking/", {
        headers: { cookie: cookies },
      });
      expect(response.status()).toBe(200);

      const body = await response.json();
      expect(body.bookings.length).toBeGreaterThanOrEqual(1);
      validateBookingDetails(body.bookings[0]);
    });
  });

  test("GET booking by id with details", async ({ request }: { request: APIRequestContext }) => {
    await test.step("Fetch booking by ID", async () => {
      const response = await request.get(API_BASE_URL + "booking/1", {
        headers: { cookie: cookies },
      });
      expect(response.status()).toBe(200);

      const body = await response.json();
      validateBookingDetails(body);
    });
  });
});

async function getAuthCookies(request: APIRequestContext): Promise<string> {
  const response = await request.post(API_BASE_URL + "auth/login", {
    data: {
      username: "admin",
      password: "password",
    },
  });
  expect(response.status()).toBe(200);
  const headers = response.headers();
  return headers["set-cookie"];
}

function validateBookingDetails(booking: Booking) {
  expect(booking).toHaveProperty('bookingdates');
  expect(booking.bookingid).toBe(1);
  expect(booking.roomid).toBe(1);
  expect(booking.firstname).toBe("James");
  expect(booking.lastname).toBe("Dean");
  expect(booking.depositpaid).toBe(true);
  expect(isValidDate(booking.bookingdates.checkin)).toBe(true);
  expect(isValidDate(booking.bookingdates.checkout)).toBe(true);
}

export function isValidDate(date: string): boolean {
  return !!Date.parse(date);
}
