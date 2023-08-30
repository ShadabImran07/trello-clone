import { create } from "zustand";
import openai from "@/openai";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
	const { todos } = await request.json();
	console.log(todos);
	const response = await openai.chat.completions.create({
		model: "gpt-3.5-turbo",
		messages: [
			{ role: "system", content: "Welcome to my Trello App" },
			{
				role: "user",
				content: `Hello EveyOne provided a summary of the following todos.Here's the data:${JSON.stringify(
					todos
				)}`,
			},
		],
		stream: false,
	});
	console.log(response);
	return NextResponse.json(response.choices[0].message);
}
