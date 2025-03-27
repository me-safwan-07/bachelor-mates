import { QuestionPaperData } from "@/lib/questionPaper/data"

export const NotesView = () => {
    return (
        <>
        {QuestionPaperData.map((questionPaper, index) => (
            <div className="" key={index}>
                <p>{questionPaper.degree}</p>
            </div>
        ))}
        </>
    )
};