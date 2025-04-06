import Button from "./Button";

interface Props {
  setCurrentPage: (page: string) => void;
}

function TopNavBar(prop: Props){
    return(
        <nav className="fixed top-0 left-0 w-full bg-indigo-950 border-b-1 text-white p-4 flex justify-between items-center shadow-md z-50">
        <div className="font-mono text-xl font-bold">ProcrastSP</div>
        <div className="flex gap-4">
        <Button type="button" disabled={false} onClick={() => prop.setCurrentPage("WOTE1")}>WOTE?</Button>
        <Button type="button" disabled={false} onClick={() => prop.setCurrentPage("WOTE2")}>WOTE2?</Button>
        <Button type="button" disabled={false} onClick={() => prop.setCurrentPage("CoCClassify")}>CoCBuild</Button>
        </div>
      </nav>
    )
}

export default TopNavBar;


// Notes:
// onclick also is a function so need () then => in this case we call another function so just call taht function inside of that