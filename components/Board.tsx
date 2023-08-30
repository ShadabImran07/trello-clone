"use client";
import { useEffect } from "react";
import { useBoardStore } from "@/store/BoardStore";
import { DragDropContext, DropResult, Droppable } from "react-beautiful-dnd";
import Column from "./Column";

const Board = () => {
	const [board, getBoard, setBoardState, updateTodoInDB] = useBoardStore(
		(state) => [
			state.board,
			state.getBoard,
			state.setBoardState,
			state.updateTodoInDB,
		]
	);

	const handleOnDragEnd = (result: DropResult) => {
		const { destination, source, type } = result;
		if (!destination) {
			return;
		}
		if (type === "column") {
			const entries = Array.from(board.columns.entries());
			const [removed] = entries.splice(source.index, 1);
			entries.splice(destination.index, 0, removed);
			const rearrangedColumn = new Map(entries);
			setBoardState({
				...board,
				columns: rearrangedColumn,
			});
		}
		const columns = Array.from(board.columns);
		const startColIndex = columns[Number(source.droppableId)];
		const finishColIndex = columns[Number(destination.droppableId)];

		const startCol: Column = {
			id: startColIndex[0],
			todos: startColIndex[1].todos,
		};
		const finishCol: Column = {
			id: finishColIndex[0],
			todos: finishColIndex[1].todos,
		};
		if (!startColIndex || !finishColIndex) return;
		if (
			source.index === destination.index &&
			source.droppableId === destination.droppableId
		)
			return;

		const newTodo = startCol.todos;
		const [todoMoved] = newTodo.splice(source.index, 1);

		if (startCol.id === finishCol.id) {
			newTodo.splice(destination.index, 0, todoMoved);
			const newCol = {
				id: startCol.id,
				todos: newTodo,
			};
			const newColumns = new Map(board.columns);
			newColumns.set(startCol.id, newCol);
			setBoardState({
				...board,
				columns: newColumns,
			});
		} else {
			const finishTodo = Array.from(finishCol.todos);
			finishTodo.splice(destination.index, 0, todoMoved);
			const newColumns = new Map(board.columns);
			const newCol = {
				id: startCol.id,
				todos: newTodo,
			};
			newColumns.set(startCol.id, newCol);
			newColumns.set(finishCol.id, {
				id: finishCol.id,
				todos: finishTodo,
			});
			updateTodoInDB(todoMoved, finishCol.id);
			setBoardState({
				...board,
				columns: newColumns,
			});
		}
	};
	useEffect(() => {
		getBoard();
	}, [getBoard]);
	console.log(board);
	return (
		<DragDropContext onDragEnd={handleOnDragEnd}>
			<Droppable
				droppableId='borad'
				direction='horizontal'
				type='column'
			>
				{(provided, snapshot) => (
					<div
						className='grid grid-cols-1 md:grid-cols-3 gap-3 max-w-7xl mx-auto'
						ref={provided.innerRef}
						{...provided.droppableProps}
					>
						{Array.from(board.columns.entries()).map(([id, column], index) => (
							<Column
								key={id}
								id={id}
								index={index}
								todos={column.todos}
							/>
						))}
					</div>
				)}
			</Droppable>
		</DragDropContext>
	);
};

export default Board;
