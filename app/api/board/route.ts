// import { create } from 'zustand';
// import axios from 'axios';

// const API_BASE_URL = '/api/board'; // API route created in pages/api/board.js

// export const useBoardStore = create((set, get) => ({
//   // ... Existing state ...

//   getBoard: async () => {
//     try {
//       const response = await axios.get(API_BASE_URL);
//       set({ board: response.data });
//     } catch (error) {
//       console.error('Error getting board:', error);
//     }
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

// import axios from "axios";

// const API_BASE_URL = "http://localhost:3000/api/";

// export default async (req, res) => {
// 	const { method, body, query } = req;
// 	const { id } = query;

// 	try {
// 		switch (method) {
// 			case "GET":
// 				const response = await axios.get(`${API_BASE_URL}/boards`);
// 				res.status(response.status).json(response.data);
// 				break;

// 			case "POST":
// 				const createResponse = await axios.post(`${API_BASE_URL}/todos`, body);
// 				res.status(createResponse.status).json(createResponse.data);
// 				break;

// 			case "PUT":
// 				const updateResponse = await axios.put(
// 					`${API_BASE_URL}/todos/${id}`,
// 					body
// 				);
// 				res.status(updateResponse.status).json(updateResponse.data);
// 				break;

// 			case "DELETE":
// 				await axios.delete(`${API_BASE_URL}/todos/${id}`);
// 				res.status(204).end();
// 				break;

// 			default:
// 				res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
// 				res.status(405).end(`Method ${method} Not Allowed`);
// 		}
// 	} catch (error) {
// 		res.status(error.response?.status || 500).json({ error: error.message });
// 	}
// };
