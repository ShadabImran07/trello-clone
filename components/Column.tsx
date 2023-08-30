import { PlusCircleIcon } from "@heroicons/react/20/solid";
import React from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { TodoCard } from "./TodoCard";
import { useBoardStore } from "@/store/BoardStore";
import { useModelStore } from "@/store/ModelStore";

type Props = {
	id: TypedColumn;
	todos: Todo[];
	index: number;
};

const idToColumnText: {
	[key in TypedColumn]: string;
} = {
	todo: "To Do",
	inprogress: "In Progress",
	done: "Done",
};
const Column = ({ id, todos, index }: Props) => {
	const [searchString, setNewTaskTyped] = useBoardStore((state) => [
		state.searchString,
		state.setNewTaskTyped,
	]);
	const openModal = useModelStore((state) => state.openModal);
	const handleAddTodo = () => {
		setNewTaskTyped(id);
		openModal();
	};
	return (
		<Draggable
			draggableId={id}
			index={index}
		>
			{(provided) => (
				<div
					ref={provided.innerRef}
					{...provided.dragHandleProps}
					{...provided.draggableProps}
				>
					<Droppable
						droppableId={index.toString()}
						type='card'
					>
						{(provided, snapshot) => (
							<div
								{...provided.droppableProps}
								ref={provided.innerRef}
								className={`p-2 rounded-2xl shadow-sm ${
									snapshot.isDraggingOver ? "bg-green-200" : "bg-white/50"
								}`}
							>
								<h2 className='flex justify-between font-bold text-xl p-2'>
									{idToColumnText[id]}
									<span className='text-gray-500 bg-gray-200 rounded-full px-2 py-1 text-sm font-normal'>
										{!searchString
											? todos.length
											: todos.filter((todo) =>
													todo.title
														.toLocaleLowerCase()
														.includes(searchString.toLocaleLowerCase())
											  ).length}
									</span>
								</h2>
								<div className='space-y-2'>
									{todos.map((todo, index) => {
										if (
											searchString &&
											!todo.title
												.toLocaleLowerCase()
												.includes(searchString.toLocaleLowerCase())
										)
											return null;
										return (
											<Draggable
												key={todo.$id}
												draggableId={todo.$id}
												index={index}
											>
												{(provided) => (
													<TodoCard
														todo={todo}
														index={index}
														id={id}
														innerRef={provided.innerRef}
														draggableProps={provided.draggableProps}
														dragHandleProps={provided.dragHandleProps}
													/>
												)}
											</Draggable>
										);
									})}
									{provided.placeholder}
									<div className='flex items-end justify-end p-2'>
										<button
											onClick={handleAddTodo}
											className='text-green-500 hover:text-gren-600'
										>
											<PlusCircleIcon className='h-10 w-10' />
										</button>
									</div>
								</div>
							</div>
						)}
					</Droppable>
				</div>
			)}
		</Draggable>
	);
};

export default Column;