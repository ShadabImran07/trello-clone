// "use client";
// import { Fragment, useRef } from "react";
// import { Dialog, Transition } from "@headlessui/react";
// import { useModelStore } from "@/store/ModelStore";
// import { useBoardStore } from "@/store/BoardStore";
// import TaskTypedRadioGroup from "./TaskTypedRadioGroup";
// import Image from "next/image";
// import { PhotoIcon } from "@heroicons/react/20/solid";

// function Model() {
// 	const imagePickerRef = useRef<HTMLInputElement>(null);
// 	const [newTaskInput, addTask, setTaskInput, image, setImage, newTaskTyped] =
// 		useBoardStore((state) => [
// 			state.newTaskInput,
// 			state.addTask,
// 			state.setTaskInput,
// 			state.image,
// 			state.setImage,
// 			state.newTaskTyped,
// 		]);

// 	const [isOpen, closeModel] = useModelStore((state) => [
// 		state.isOpen,
// 		state.closeModel,
// 	]);
// 	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
// 		e.preventDefault();
// 		if (!newTaskInput) return;
// 		addTask(newTaskInput, newTaskTyped, image);
// 		setImage(null);
// 		closeModel();
// 	};
// 	return (
// 		// Use the `Transition` component at the root level
// 		<Transition
// 			appear
// 			show={isOpen}
// 			as={Fragment}
// 		>
// 			<Dialog
// 				as='form'
// 				className='relative z-10 flex justify-center items-center'
// 				onClose={closeModel}
// 			>
// 				{/*
//           Use one Transition.Child to apply one transition to the backdrop...
//         */}
// 				<div className='fixed insert-0 overflow-y-auto'>
// 					<div className='flex min-h-full items-center justify-center  p-4 text-center'>
// 						<Transition.Child
// 							as={Fragment}
// 							enter='ease-out duration-300'
// 							enterFrom='opacity-0'
// 							enterTo='opacity-100'
// 							leave='ease-in duration-200'
// 							leaveFrom='opacity-100'
// 							leaveTo='opacity-0'
// 						>
// 							{/* <div className='fixed inset-0 bg-black bg-opacity-25' /> */}
// 							<Dialog.Panel className='w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
// 								<Dialog.Title
// 									as='h3'
// 									className='text-lg font-medium leading-6 text-gray-900 pb-2'
// 								>
// 									Add a New Task
// 								</Dialog.Title>
// 								<div className='mt-2'>
// 									<input
// 										type='text'
// 										value={newTaskInput}
// 										onChange={(e) => setTaskInput(e.target.value)}
// 										placeholder='Enter a task here...'
// 										className='w-full border-gray-300 rounded-md outline-none p-2'
// 									/>
// 								</div>
// 								<TaskTypedRadioGroup />
// 								<div>
// 									<button
// 										type='button'
// 										onClick={() => imagePickerRef.current?.click()}
// 										className='w-full border border-gray-300 rounded-md outline-none p-5 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2'
// 									>
// 										<PhotoIcon className='h-6 w-6 mr-2 inline-block' />
// 										Upload Image
// 									</button>
// 									{image && (
// 										<Image
// 											alt='Uploaded Image'
// 											width={200}
// 											height={200}
// 											className='w-full h-44 object-cover mt-2 filter hover:grayscale
//         transition-all duration-150 cursor-not-allowed
//         '
// 											src={URL.createObjectURL(image)}
// 											onClick={() => {
// 												setImage(null);
// 											}}
// 										/>
// 									)}
// 									<input
// 										type='file'
// 										ref={imagePickerRef}
// 										hidden
// 										onChange={(e) => {
// 											if (!e.target.files![0].type.startsWith("image/")) return;
// 											setImage(e.target.files![0]);
// 										}}
// 									/>
// 								</div>
// 								<div className='mt-2'>
// 									<button
// 										type='submit'
// 										disabled={!newTaskInput}
// 										className='inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm mt-2 font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:bg-gray-100 disabled:text-gray-300 disabled:cursor-not-allowed'
// 									>
// 										Add Task
// 									</button>
// 								</div>{" "}
// 							</Dialog.Panel>
// 						</Transition.Child>{" "}
// 					</div>
// 				</div>
// 			</Dialog>
// 		</Transition>
// 	);
// }

// export default Model;
"use client";

import React, { useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useModelStore } from "@/store/ModelStore"; // Import your ModelStore
import { useBoardStore } from "@/store/BoardStore"; // Import your BoardStore
import TaskTypedRadioGroup from "./TaskTypedRadioGroup"; // Import your TaskTypedRadioGroup
import Image from "next/image";
import { XCircleIcon } from "@heroicons/react/20/solid";
import { PhotoIcon } from "@heroicons/react/20/solid";

function Model() {
	const imagePickerRef = useRef<HTMLInputElement>(null);
	const [newTaskInput, addTask, setTaskInput, image, setImage, newTaskTyped] =
		useBoardStore((state) => [
			state.newTaskInput,
			state.addTask,
			state.setTaskInput,
			state.image,
			state.setImage,
			state.newTaskTyped,
		]);

	const [isOpen, closeModel] = useModelStore((state) => [
		state.isOpen,
		state.closeModel,
	]);
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!newTaskInput) return;
		addTask(newTaskInput, newTaskTyped, image);
		setImage(null);
		closeModel();
	};

	return (
		<Transition.Root
			show={isOpen}
			as={React.Fragment}
		>
			<Dialog
				as='form'
				onSubmit={handleSubmit}
				className='fixed z-10 inset-0 overflow-y-auto'
				onClose={closeModel}
			>
				<div className='flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0'>
					<Transition.Child
						as={React.Fragment}
						enter='ease-out duration-300'
						enterFrom='opacity-0'
						enterTo='opacity-100'
						leave='ease-in duration-200'
						leaveFrom='opacity-100'
						leaveTo='opacity-0'
					>
						<Dialog.Overlay className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity' />
					</Transition.Child>

					{/* This element is to trick the browser into centering the modal contents. */}
					<span
						className='hidden sm:inline-block sm:align-middle sm:h-screen'
						aria-hidden='true'
					>
						&#8203;
					</span>

					<Transition.Child
						as={React.Fragment}
						enter='ease-out duration-300'
						enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
						enterTo='opacity-100 translate-y-0 sm:scale-100'
						leave='ease-in duration-200'
						leaveFrom='opacity-100 translate-y-0 sm:scale-100'
						leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
					>
						<div className='inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-md sm:w-full sm:p-6'>
							<div className='absolute top-0 right-0 pt-4 pr-4'>
								<button
									type='button'
									className='text-gray-400 hover:text-gray-500 focus:outline-none'
									onClick={closeModel}
								>
									<XCircleIcon
										className='h-6 w-6'
										aria-hidden='true'
									/>
								</button>
							</div>

							<div className='mt-3 text-center sm:mt-5'>
								<Dialog.Title
									as='h3'
									className='text-lg leading-6 font-medium text-gray-900'
								>
									Add a New Task
								</Dialog.Title>
								<div className='mt-2'>
									<input
										type='text'
										value={newTaskInput}
										onChange={(e) => setTaskInput(e.target.value)}
										placeholder='Enter a task here...'
										className='w-full border-gray-300 rounded-md outline-none p-2'
									/>
								</div>
								<TaskTypedRadioGroup />

								<div>
									<button
										type='button'
										onClick={() => imagePickerRef.current?.click()}
										className='w-full border border-gray-300 rounded-md outline-none p-5 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2'
									>
										<PhotoIcon className='h-6 w-6 mr-2 inline-block' />
										Upload Image
									</button>
									{image && (
										<Image
											alt='Uploaded Image'
											width={200}
											height={200}
											className='w-full h-44 object-cover mt-2 filter hover:grayscale
                                    transition-all duration-150 cursor-not-allowed
                                    '
											src={URL.createObjectURL(image)}
											onClick={() => {
												setImage(null);
											}}
										/>
									)}
									<input
										type='file'
										ref={imagePickerRef}
										hidden
										onChange={(e) => {
											if (!e.target.files![0].type.startsWith("image/")) return;
											setImage(e.target.files![0]);
										}}
									/>
								</div>
								<div className='mt-2'>
									<button
										type='submit'
										disabled={!newTaskInput}
										className='inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm mt-2 font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:bg-gray-100 disabled:text-gray-300 disabled:cursor-not-allowed'
									>
										Add Task
									</button>
								</div>
							</div>
						</div>
					</Transition.Child>
				</div>
			</Dialog>
		</Transition.Root>
	);
}

export default Model;
