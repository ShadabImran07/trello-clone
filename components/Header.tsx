"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import Avatar from "react-avatar";
import trelloLogo from "../public/trello-official.svg";
import { MagnifyingGlassIcon, UserCircleIcon } from "@heroicons/react/20/solid";
import { useBoardStore } from "@/store/BoardStore";
import fetchSuggestion from "@/lib/fetchSuggestion";

const Header = () => {
	const [board, searchString, setSearchString] = useBoardStore((state) => [
		state.board,
		state.searchString,
		state.setSearchString,
	]);
	const [loading, setLoading] = useState<boolean>(false);
	const [suggestions, setSuggestions] = useState<string>("");
	useEffect(() => {
		if (board.columns.size === 0) return;
		setLoading(true);
		const fetchSuggestionsFunc = async () => {
			const suggestions = await fetchSuggestion(board);
			setSuggestions(suggestions);
			setLoading(false);
		};
		fetchSuggestionsFunc();
	}, [board]);
	return (
		<header>
			<div className='flex flex-col md:flex-row items-center p-5 bg-gray-500/10 rounded-2xl'>
				<Image
					src={trelloLogo}
					alt='trello logo'
					width={300}
					height={100}
					className='w-44 md:w-56 pb-10 md:pb-0 object-contain'
				/>
				<div className='absolute top-0 left-0 w-full h-95 bg-gradient-to-br from-pink-400 to-[#0055D1]' />

				<div className='flex items-center space-x-2  flex-1 justify-end w-full'>
					<form className='flex items-center space-x-5 bg-white rounded-md p-2 shadow-md flex-1 md:flex-initial'>
						<MagnifyingGlassIcon className='h-6 w-6 text-gray-400' />
						<input
							type='text'
							placeholder='Search'
							value={searchString}
							onChange={(e) => setSearchString(e.target.value)}
							className='flex-1 outline-none'
						/>
						<button
							type='submit'
							hidden
						>
							Search
						</button>
					</form>
					<Avatar
						name='Shadab'
						round
						color='#0055D1'
						size='50'
					/>
				</div>
			</div>
			<div className='flex items-center justify-center px-5 py-2 md:py-5'>
				<p className='flex items-center p-5 text-sm font-light pr-5 shadow-xl rounded-xl w-fit bg-white italic max-w-3xl text-[#0055D1]'>
					<UserCircleIcon
						className={`inline-block h-10 w-10  text-[#0055D1] mr-1 ${
							loading && "animate-spin"
						}`}
					/>
					{suggestions && !loading
						? suggestions
						: "GPT is Summarising your task for the day..."}
				</p>
			</div>
		</header>
	);
};

export default Header;
