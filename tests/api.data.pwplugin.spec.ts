import { test, expect } from '@playwright/test';
import { apiFetch, apiGet, apiPost, apiPut, apiDelete, apiPatch, apiHead } from 'pw-api-plugin';

test.describe('API Tests for https://jsonplaceholder.typicode.com', () => {

    const baseUrl = 'https://jsonplaceholder.typicode.com';

    test('Testing API Endpoints - Perform Single Call for Each CRUD Operation (GET, HEAD, POST, PUT, PATCH, DELETE)', async ({ request, page }) => {
        // ✔️ Example of apiGet
        const responseGet = await apiGet({ request, page }, `${baseUrl}/posts/1`);
        expect(responseGet.status()).toBe(200);
        const responseBodyGet = await responseGet.json();
        expect(responseBodyGet).toHaveProperty('id', 1);

        // ✔️ Example of apiHead
        const responseHead = await apiHead({ request, page }, `${baseUrl}/posts/1`);
        expect(responseHead.status()).toBe(200);

        // ✔️ Example of apiPost (with request body and request headers)
        const responsePost = await apiPost({ request, page }, `${baseUrl}/posts`, {
            body: {
                title: 'foo',
                body: 'bar',
                userId: 1,
            },
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        });
        expect(responsePost.status()).toBe(201);
        const responseBodyPost = await responsePost.json();
        expect(responseBodyPost).toHaveProperty('id', 101);

        // ✔️ Example of apiPut (with request body and request headers)
        const responsePut = await apiPut({ request, page }, 'https://jsonplaceholder.typicode.com/posts/1', {
            body: {
                id: 1,
                title: 'foo',
                body: 'bar',
                userId: 1,
            },
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        });
        expect(responsePut.ok()).toBeTruthy();
        const responseBodyPut = await responsePut.json();
        expect(responseBodyPut).toHaveProperty('id', 1);

        // ✔️ Example of apiPatch (with request body and request headers)
        const responsePatch = await apiPatch({ request, page }, 'https://jsonplaceholder.typicode.com/posts/1', {
            body: {
                title: 'foo',
            },
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        });
        expect(responsePatch.ok()).toBeTruthy();

        // ✔️ Example for apiDelete
        const responseDelete = await apiDelete({ request, page }, 'https://jsonplaceholder.typicode.com/posts/1');
        expect(responseDelete.ok()).toBeTruthy();
    })

    test('Verify Single API Call Using apiFetch with Default GET Method', async ({ request, page }) => {
        // ✔️ Example of apiFetch (default GET)
        const responseFetch = await apiFetch({ request, page }, `${baseUrl}/posts`);
        expect(responseFetch.status()).toBe(200);
        const responseBodyFetch = await responseFetch.json();
        expect(responseBodyFetch.length).toBeGreaterThan(4);
    })

    test('Verify Single API Call Using PW native GET Method', async ({ request }) => {
        // ✔️ Example of get Playwright native method
        const response = await request.get(`${baseUrl}/posts`);
        expect(response.status()).toBe(200);
        const responseBody = await response.json();
        expect(responseBody.length).toBeGreaterThan(4);
   })
})
