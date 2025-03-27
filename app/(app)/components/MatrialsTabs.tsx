import { cn } from "@/lib/utils";
import { TMatrialTabs } from "@/types/matrials";


interface Tab {
    id: TMatrialTabs;
    label: string;
}

const tabs: Tab[] = [
    {
        id: "notes",
        label: "Notes"
    },
    {
        id: "questionspaper",
        label: "Question Paper",
    },
    {
        id: "QuestionBank",
        label: "Question Bank"
    },
];

interface MatrialsTabsProps {
    activeId: TMatrialTabs,
    setActiveId: React.Dispatch<React.SetStateAction<TMatrialTabs>>;
}


export const MatrialsTabs = ({
    activeId,
    setActiveId,
}: MatrialsTabsProps) => {
    return (
        <div className="fixed z-30 flex h-14 w-full items-center justify-center border bg-white ">
            <div className="flex h-full items-center space-x-4" aria-label="Tabs">
                {tabs.map((tab) => (
                    <button
                        type="button"
                        key={tab.id}
                        onClick={() => setActiveId(tab.id)}
                        className={cn(
                            tab.id === activeId
                                ? "border-brand-dark border-b-2 font-semibold text-slate-900"
                                : "text-slate-500 hover:text-slate-700",
                                "flex h-full items-center px-3 text-sm font-medium"
                        )}
                        aria-current={tab.id === activeId ? "page" : undefined}>
                        {tab.label}
                    </button>
                ))}
            </div>
        </div>
    )
}