import Link from 'next/link';

export const ResumeHeader = () => {
	return (
		<div>
			<div>
				<h1 className="text-3xl text-center font-bold mb-2 text-blue-500">Middle frontend developer</h1>
				<div className="relative w-full h-1 bg-primary">
					<span className="absolute w-1/2 h-2 bg-blue-500 left-1/2 top-1/2 -translate-1/2" />
				</div>
				<h2 className="text-8xl text-center font-bold">Oleg Kudelkin</h2>
			</div>
			<div className="relative mt-15 flex justify-center items-center shadow-2xl shadow-black border">
				<ul className="h-50 w-1/2">
					<li className="text-2xl/25 font-bold h-1/2 hover:bg-blue-500 hover:text-white cursor-pointer transition-all duration-300">
						<Link
							href="https://t.me/twnwn52"
							target="_blank"
							className="w-full h-full pl-10"
						>
							@twnwn52
						</Link>
					</li>
					<li className="text-2xl/25 font-bold h-1/2 hover:bg-blue-500 hover:text-white cursor-pointer transition-all duration-300">
						<Link
							href="mailto:tryhard.work@mail.ru"
							className="w-full h-full pl-10"
						>
							tryhard.work@mail.ru
						</Link>
					</li>
				</ul>
				<div className="absolute w-50 h-50 rounded-full shadow-2xl shadow-black flex items-center justify-center bg-blue-500 z-10">
					<span className="text-4xl font-bold text-white">OK</span>
				</div>
				<ul className="text-end h-50 w-1/2">
					<li className="text-2xl/25 font-bold h-1/2 hover:bg-blue-500 hover:text-white cursor-pointer transition-all duration-300">
						<Link
							href="https://nn.hh.ru/resume/c636c5a1ff101c4c2c0039ed1f53593561414a"
							className="block w-full h-full pr-10"
							target="_blank"
						>
							headHunter
						</Link>
					</li>
					<li className="text-2xl/25 font-bold h-1/2 hover:bg-blue-500 hover:text-white cursor-pointer transition-all duration-300">
						<Link
							href="https://github.com/JuniorNR"
							className="block w-full h-full pr-10"
							target="_blank"
						>
							github
						</Link>
					</li>
				</ul>
			</div>
		</div>
	);
};
