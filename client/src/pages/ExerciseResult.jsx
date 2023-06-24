import { Link } from "react-router-dom";

const ExerciseResult = () => {
    return (
        <div>
            <h1>ExerciseResult</h1>
            <li><Link to="../model3D">model3D</Link></li>
            <li><Link to="../instruction">instruction</Link></li>
            <li><Link to="/">home</Link></li>

        </div>
    );
}

export default ExerciseResult;
