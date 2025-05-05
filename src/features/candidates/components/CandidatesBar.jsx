import { useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { setActiveTab, setViewMode ,clearSelectedCandidate } from "../candidatesUI.slice";
import { selectActiveTab, selectViewMode as selectCandidateViewMode } from "../candidatesSelectors";
import { TbUsersPlus } from "react-icons/tb";

const tabs = ["All", "Pending", "Interviewed", "Rejected"];

export default function CandidatesBar() {
  const dispatch = useDispatch();
  const activeTab = useSelector(selectActiveTab);
  const viewMode = useSelector(selectCandidateViewMode);

  useEffect(() => {
    const savedTab = localStorage.getItem("lastTab_candidates");
    if (savedTab && tabs.includes(savedTab)) {
      dispatch(setActiveTab(savedTab));
    } else {
      dispatch(setActiveTab("All"));
    }
  }, [dispatch]);

  const handleTabClick = (tab) => {
    localStorage.setItem("lastTab_candidates", tab);
    dispatch(setActiveTab(tab));
    dispatch(setViewMode("list"));
  };

  const handleNewCandidate = () => {
    dispatch(clearSelectedCandidate());
    dispatch(setViewMode("edit"));
  };

  return (
    <div className="w-full px-6 bg-white transition-colors duration-300  dark:border-gray-700 border-b border-gray-200 dark:bg-gray-800">
      <div className="flex items-center justify-between max-w-7xl mx-auto py-3 flex-wrap gap-6">
        {/* Tabs */}
        <div className="flex gap-6">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => handleTabClick(tab)}
              className={`text-sm font-medium pb-1 transition border-b-2 hover:scale-[1.05] ${
                activeTab === tab && viewMode === "list"
                  ? "text-blue-600 dark:text-blue-400 border-blue-600 dark:border-blue-400"
                  : "border-transparent text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* + New Candidate Button */}
        <button
          onClick={handleNewCandidate}
          className={`flex items-center gap-2 text-sm font-medium ${
            viewMode === "edit"
              ? "bg-greenPrimary hover:greenHover text-white border-greenPrimary border"
              : "bg-skyBlue border border-skyBorder hover:bg-skyBorder text-white"
          } text-white p-1 rounded-full transition hover:scale-[1.02]`}
        >
          <TbUsersPlus size={22} />
        </button>
      </div>
    </div>
  );
}