"use client";

import { useSearchParams } from 'next/navigation';
import { useState } from 'react';

import TitleForm from "./_components/TitleForm";

const EditPage = () => {
  const searchParams = useSearchParams();
  const item = searchParams.get('item'); // Get the 'item' query parameter

  const [name, setName] = useState<string>('');

  return (
    <main>
    <div className="flex items-center justify-around mt-10 mb-10">
            <TitleForm item={item}/>
    </div>
    <div>
      <hr className="mb-2 w-full"/>
      <div className="ml-5 mr-5">
      <p className="ml-2 text-gray-400 text-sm">{item}</p>
      <input
        type="text"
        id="name"
        className="h-[35px] w-full rounded-2xl focus:outline-none border text-gray-900 text-lg border-none px-2 py-2.5 text-placeholder"
        placeholder={item || ""}
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      </div>
      <hr/>
    </div>
    </main>
  );
}

export default EditPage;
