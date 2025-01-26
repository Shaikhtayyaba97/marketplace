import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        // Validate incoming data
        if (!body.name || !body.email || !body.city || !body.address || !body.phoneNumber) {
            return NextResponse.json(
                { message: "Invalid data. Please provide all required fields." },
                { status: 400 }
            );
        }

        // Sanity client setup
        const doc = {
            _type: "orderdetail",
            name: body.name,
            email: body.email,
            city: body.city,
            address: body.address,
            phoneNumber: body.phoneNumber,
            totalPrice: body.totalPrice,
            cartItems: body.cartItems.map((item: any) => ({
            
                _type: "cartItem",
                productId: item._id,
                name: item.name,
                quantity: item.quantity,
                price: item.price,
                image: item.image,
            })),
        };

        // Save data to Sanity
        const sanityResponse = await fetch(`https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2021-06-07/data/mutate/${process.env.NEXT_PUBLIC_SANITY_DATASET}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${process.env.SANITY_API_TOKEN}`,
            },
            body: JSON.stringify({ mutations: [{ create: doc }] }),
        });

        if (!sanityResponse.ok) {
            throw new Error("Failed to save order in Sanity.");
        }

        const result = await sanityResponse.json();

        return NextResponse.json({ message: "Order submitted successfully!", result }, { status: 200 });
    } catch (error: unknown) {
        console.error("Error:", error);
        if (error instanceof Error) {
          console.error(error.stack); // Stack trace for better debugging
          return NextResponse.json(
            { message: "Failed to submit order.", error: error.message },
            { status: 500 }
          );
        }
        return NextResponse.json(
          { message: "Failed to submit order.", error: "Unknown error occurred." },
          { status: 500 }
        );
      

        // Fallback in case the error is not an instance of Error
        return NextResponse.json(
            { message: "Failed to submit order.", error: "Unknown error occurred." },
            { status: 500 }
        );
    }
}