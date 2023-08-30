"use client";

import { useState, useEffect } from "react";
import { useBoardStore } from "@/store/BoardStore";
import { XCircleIcon } from "@heroicons/react/20/solid";
import {
	DraggableProvidedDragHandleProps,
	DraggableProvidedDraggableProps,
} from "react-beautiful-dnd";
import geturl from "@/lib/getUrl";
import Image from "next/image";

type Props = {
	todo: Todo;
	index: number;
	id: TypedColumn;
	innerRef: (element: HTMLElement | null) => void;
	draggableProps: DraggableProvidedDraggableProps;
	dragHandleProps: DraggableProvidedDragHandleProps | null | undefined;
};

export const TodoCard = ({
	todo,
	index,
	id,
	innerRef,
	draggableProps,
	dragHandleProps,
}: Props) => {
	const deleteTask = useBoardStore((state) => state.deleteTask);
	const [imageUrl, setImageurl] = useState<string | null>(null);
	useEffect(() => {
		if (todo.image) {
			const fetchIamage = async () => {
				const url = await geturl(todo.image!);
				if (url) {
					setImageurl(url.toString());
				}
			};
			fetchIamage();
		}
	}, [todo]);
	return (
		<div
			{...draggableProps}
			{...dragHandleProps}
			ref={innerRef}
			className='bg-white rounded-md space-y-2 drop-shadow-md'
		>
			<div className='flex justify-between items-center p-5'>
				<p>{todo.title}</p>
				<button
					onClick={() => deleteTask(index, todo, id)}
					className='text-red-500 hover:text-red-600'
				>
					<XCircleIcon className='ml-5 h-8 w-8' />
				</button>
			</div>
			{imageUrl && (
				<div className='h-full w-full rounded-b-md'>
					<Image
						src={imageUrl}
						alt='task Image'
						width={400}
						height={200}
						className='w-full object-contain rounded-b-md'
					/>
				</div>
			)}
		</div>
	);
};