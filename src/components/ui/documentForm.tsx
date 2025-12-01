import { useState } from "react";
import { Control, UseFormSetValue } from "react-hook-form";
import { ListMinus } from "lucide-react";

interface TDocuments {
  AthleteDocName: string;
  AthleteDocRelatedId: string;
  AthleteDocPhysicalPathUrl: string;
  DocCategoryId: number;
}

interface Props {
  control: Control<any>;
  setValue: UseFormSetValue<any>;
  watchDocuments: TDocuments[] | undefined;
}

export default function DocumentForm({ control, setValue, watchDocuments }: Props) {
  const [docList, setDocList] = useState<TDocuments[]>(watchDocuments || []);
  const [doc, setDoc] = useState<TDocuments>({
    AthleteDocName: "",
    AthleteDocRelatedId: "",
    AthleteDocPhysicalPathUrl: "",
    DocCategoryId: 1,
  });

  // Add document to list
  const addDocument = () => {
    setDocList([...docList, doc]);
    setValue("AthleteDocuments", [...docList, doc]); // update RHF
    setDoc({ AthleteDocName: "", AthleteDocRelatedId: "", AthleteDocPhysicalPathUrl: "", DocCategoryId: 1 });
  };

  // Remove document
  const removeDocument = (index: number) => {
    const newList = [...docList];
    newList.splice(index, 1);
    setDocList(newList);
    setValue("AthleteDocuments", newList);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <input
          placeholder="Doc Name"
          value={doc.AthleteDocName}
          onChange={(e) => setDoc({ ...doc, AthleteDocName: e.target.value })}
          className="border p-2 rounded"
        />
        <input
          placeholder="Related Id"
          value={doc.AthleteDocRelatedId}
          onChange={(e) => setDoc({ ...doc, AthleteDocRelatedId: e.target.value })}
          className="border p-2 rounded"
        />
        <input
          placeholder="Physical Path URL"
          value={doc.AthleteDocPhysicalPathUrl}
          onChange={(e) => setDoc({ ...doc, AthleteDocPhysicalPathUrl: e.target.value })}
          className="border p-2 rounded"
        />
        <select
          value={doc.DocCategoryId}
          onChange={(e) => setDoc({ ...doc, DocCategoryId: Number(e.target.value) })}
          className="border p-2 rounded"
        >
          <option value={1}>A</option>
          <option value={2}>B</option>
          <option value={3}>C</option>
        </select>
      </div>

      <button
        type="button"
        onClick={addDocument}
        className="bg-blue-600 text-white px-4 py-2 rounded mt-2"
      >
        Add Document
      </button>

      {/* Grid view */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        {docList.map((item, index) => (
          <div key={index} className="border p-2 rounded relative">
            <p><b>Name:</b> {item.AthleteDocName}</p>
            <p><b>Related Id:</b> {item.AthleteDocRelatedId}</p>
            <p><b>URL:</b> {item.AthleteDocPhysicalPathUrl}</p>
            <p><b>Category:</b> {item.DocCategoryId}</p>
            <button
              type="button"
              onClick={() => removeDocument(index)}
              className="absolute top-2 right-2 text-red-500"
            >
              <ListMinus />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
