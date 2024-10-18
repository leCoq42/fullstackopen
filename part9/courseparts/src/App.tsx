interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartDescription extends CoursePartBase {
  description: string;
}

interface CoursePartBasic extends CoursePartDescription {
  kind: "basic";
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group";
}

interface CoursePartBackground extends CoursePartDescription {
  backgroundMaterial: string;
  kind: "background";
}

interface CoursePartSpecial extends CoursePartDescription {
  requirements: string[];
  kind: "special";
}

type CoursePart =
  | CoursePartBasic
  | CoursePartGroup
  | CoursePartBackground
  | CoursePartSpecial;

interface HeaderProps {
  name: string;
}

interface PartProps {
  coursePart: CoursePart;
}

interface ContentProps {
  parts: CoursePart[];
}

interface TotalProps {
  totalCount: number;
}

const Header = (props: HeaderProps) => {
  return <h1>{props.name}</h1>;
};

const Total = (props: TotalProps) => {
  return <p>Number of exercises: {props.totalCount}</p>;
};

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`,
  );
};

const Part = ({ coursePart }: PartProps) => {
  switch (coursePart.kind) {
    case "basic":
      return (
        <div>
          <p>
            <h3>
              {coursePart.name}: {coursePart.exerciseCount}
            </h3>
          </p>
          <p>
            <i>{coursePart.description}</i>
          </p>
        </div>
      );
    case "group":
      return (
        <div>
          <p>
            <h3>
              {coursePart.name}: {coursePart.exerciseCount}
            </h3>
          </p>
          <p>
            <i>project exercises {coursePart.groupProjectCount}</i>
          </p>
        </div>
      );
    case "background":
      return (
        <div>
          <p>
            <h3>
              {coursePart.name}: {coursePart.exerciseCount}
            </h3>
          </p>
          <p>
            <i>{coursePart.description}</i>
          </p>
          <p>
            <a href={coursePart.backgroundMaterial}>background material</a>
          </p>
        </div>
      );
    case "special":
      return (
        <div>
          <p>
            <h3>
              {coursePart.name}: {coursePart.exerciseCount}
            </h3>
          </p>
          <p>
            <i>{coursePart.description}</i>
          </p>
          <p>required skills: {coursePart.requirements.join(", ")}</p>
        </div>
      );
    default:
      return assertNever(coursePart);
  }
};

const Content = (props: ContentProps) => {
  return (
    <div>
      {props.parts.map((part) => (
        <Part key={part.name} coursePart={part} />
      ))}
      <br />
    </div>
  );
};

const App = () => {
  const courseName = "Half Stack application development";

  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is an awesome course part",
      kind: "basic",
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
      kind: "group",
    },
    {
      name: "Basics of type Narrowing",
      exerciseCount: 7,
      description: "How to go from unknown to string",
      kind: "basic",
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      backgroundMaterial:
        "https://type-level-typescript.com/template-literal-types",
      kind: "background",
    },
    {
      name: "TypeScript in frontend",
      exerciseCount: 10,
      description: "a hard part",
      kind: "basic",
    },
    {
      name: "Backend development",
      exerciseCount: 21,
      description: "Typing the backend",
      requirements: ["nodejs", "jest"],
      kind: "special",
    },
  ];

  const totalExercises = courseParts.reduce(
    (sum, part) => sum + part.exerciseCount,
    0,
  );

  return (
    <div>
      <Header name={courseName} />
      <Content parts={courseParts} />
      <Total totalCount={totalExercises} />
    </div>
  );
};

export default App;
