import Button from "./Button";

function TopNavBar(){
    return(
        <nav className="fixed top-0 left-0 w-full bg-indigo-950 border-b-1 text-white p-4 flex justify-between items-center shadow-md z-50">
        <div className="font-mono text-xl font-bold">ProcrastSP</div>
        <div className="flex gap-4">
        <Button type="submit" disabled={false} onClick={() => console.log("hi")}>WOE?</Button>
        <Button type="submit" disabled={false} onClick={() => console.log("hi")}>WOEvhg?</Button>
        <Button type="submit" disabled={false} onClick={() => console.log("hi")}>CoCBuild</Button>
        </div>
      </nav>
    )
}

export default TopNavBar;