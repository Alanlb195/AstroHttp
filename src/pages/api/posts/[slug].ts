import type { APIRoute } from 'astro';
import { getEntry } from 'astro:content';

export const prerender = false;

export const GET: APIRoute = async ({ params, request }) => {
    const { slug } = params;
    const post = await getEntry('blog', slug as any);

    if (!post) {
        return new Response(JSON.stringify({ msj: `Post ${slug} not found` }), {
            status: 404,
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }

    return new Response(JSON.stringify(post), {
        status: 200,
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

export const POST: APIRoute = async ({ params, request }) => {
    const body = await request.json();

    return new Response(
        JSON.stringify({
            method: 'POST',
            ...body,
        })
        , {
            status: 200,
            headers: {
                'Content-Type': 'application/json'
            }
        }
    );
}

export const PUT: APIRoute = async ({ params, request }) => {
    const body = await request.json();

    return new Response(
        JSON.stringify({
            method: 'PUT',
            ...body,
        })
        , {
            status: 200,
            headers: {
                'Content-Type': 'application/json'
            }
        }
    );

}

export const PATCH: APIRoute = async ({ params, request }) => {
    const body = await request.json();

    return new Response(
        JSON.stringify({
            method: 'PATCH',
            ...body,
        })
        , {
            status: 200,
            headers: {
                'Content-Type': 'application/json'
            }
        }
    );
}

export const DELETE: APIRoute = async ({ params }) => {
    const { slug } = params;
    return withCors(JSON.stringify({ method: 'DELETE', slug }));
};

function withCors(body: BodyInit | null, status = 200) {
    return new Response(body, {
        status,
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
        }
    });
}
