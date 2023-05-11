import "./App.css";
import { ReactAsyncSelectForm } from "./components/ReactAsyncSelectForm";
import { Select } from "./components/Select";

const animals = [
  { value: "dog", label: "Dog" },
  { value: "cat", label: "Cat" },
  { value: "lion", label: "Lion" },
  { value: "tiger", label: "Tiger" },
  { value: "elephant", label: "Elephant" },
  { value: "giraffe", label: "Giraffe" },
  { value: "zebra", label: "Zebra" },
  { value: "penguin", label: "Penguin" },
  { value: "panda", label: "Panda" },
  { value: "koala", label: "Koala" },
];

function App() {
  return (
    <div className="App">
      <ReactAsyncSelectForm />
      <Select options={animals} defaultValue={"cat"} />
    </div>
  );
}

export default App;
