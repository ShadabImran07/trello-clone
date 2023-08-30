import { databases, storage, ID } from "@/appwrite";
import { getTodosGroupedByColumn } from "@/lib/getTodosGroupedByColumn";
import uploadImage from "@/lib/uploadImage";
import { create } from "zustand";
import axios from "axios";

interface BoardState {
	board: Board;
	getBoard: () => void;
	setBoardState: (board: Board) => void;
	updateTodoInDB: (todo: Todo, columnId: TypedColumn) => void;
	searchString: string;
	newTaskInput: string;
	setSearchString: (searchString: string) => void;
	deleteTask: (taskIndex: number, todo: Todo, id: TypedColumn) => void;

	setTaskInput: (input: string) => void;
	newTaskTyped: TypedColumn;
	setNewTaskTyped: (columnId: TypedColumn) => void;
	image: File | null;
	setImage: (image: File | null) => void;
	addTask: (todo: string, columnId: TypedColumn, image?: File | null) => void;
}

export const useBoardStore = create<BoardState>((set, get) => ({
	board: {
		columns: new Map<TypedColumn, Column>(),
	},
	getBoard: async () => {
		const board = await getTodosGroupedByColumn();
		console.log("from baordstor", board);
		set({ board });
	},
	searchString: "",
	setSearchString: (searchString) => set({ searchString }),
	setBoardState: (board) => set({ board }),
	updateTodoInDB: async (todo, columnId) => {
		await databases.updateDocument(
			process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
			process.env.NEXT_PUBLIC_TODOS_COLLECTION_ID!,
			todo.$id,
			{
				title: todo.title,
				status: columnId,
			}
		);
	},
	deleteTask: async (taskIndex: number, todo: Todo, id: TypedColumn) => {
		const newColumns = new Map(get().board.columns);
		newColumns.get(id)?.todos.splice(taskIndex, 1);
		set({ board: { columns: newColumns } });
		if (todo.image) {
			await storage.deleteFile(todo.image.bucketId, todo.image.filedId);
		}
		await databases.deleteDocument(
			process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
			process.env.NEXT_PUBLIC_TODOS_COLLECTION_ID!,
			todo.$id
		);
	},
	newTaskInput: "",
	newTaskTyped: "todo",
	setTaskInput: (input: string) => set({ newTaskInput: input }),
	setNewTaskTyped: (columnId: TypedColumn) => set({ newTaskTyped: columnId }),
	image: null,
	setImage: (image: File | null) => set({ image }),
	addTask: async (todo: string, columnId: TypedColumn, image?: File | null) => {
		let file: Image | undefined;
		if (image) {
			const fileUploaded = await uploadImage(image);
			if (fileUploaded) {
				file = {
					bucketId: fileUploaded.bucketId,
					filedId: fileUploaded.$id,
				};
			}
		}
		const { $id } = await databases.createDocument(
			process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
			process.env.NEXT_PUBLIC_TODOS_COLLECTION_ID!,
			ID.unique(),
			{
				title: todo,
				status: columnId,
				...(file && { image: JSON.stringify(file) }),
			}
		);
		set({ newTaskInput: "" });
		set((state) => {
			const newColumns = new Map(state.board.columns);
			const newTodo: Todo = {
				$id,
				$createdAt: new Date().toISOString(),
				title: todo,
				status: columnId,
				...(file && { image: file }),
			};
			const column = newColumns.get(columnId);
			if (!column) {
				newColumns.set(columnId, { id: columnId, todos: [newTodo] });
			} else {
				newColumns.get(columnId)?.todos.push(newTodo);
			}
			console.log(newColumns);
			return { board: { columns: newColumns } };
		});
	},
}));

// import { create } from 'zustand';
// API route created in pages/api/board.js

// export const useBoardStore = create((set, get) => ({
//   // ... Existing state ...

//   getBoard: async () => {

//   },

//   // Other methods...

//   addTask: async (todo, columnId, image) => {
//     try {
//       // ... Existing logic ...
//       const newTodo = {
//         title: todo,
//         status: columnId,
//         // ... Other properties ...
//       };

//       const response = await axios.post(API_BASE_URL, newTodo);
//       const createdTodo = response.data;

//       // Update state with the created todo
//       set((state) => {
//         // ... Update columns with the created todo ...
//       });
//     } catch (error) {
//       console.error('Error adding task:', error);
//     }
//   },

//   // Other methods...
// }));
