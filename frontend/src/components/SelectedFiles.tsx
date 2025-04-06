interface Props {
    files: File[];
}

function SelectedFiles(prop: Props){
    return(
        <div>
        <h4 className="font-mono"> Selected Files: </h4>
        <ul>
            {prop.files.map((file, index) => (
            <li key={index} className="font-mono text-indigo-300">{file.name}</li>
            ))}
        </ul>
        </div>
    )
}


export default SelectedFiles