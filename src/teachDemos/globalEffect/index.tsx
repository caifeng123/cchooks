import useDeepEffect from "../../hooks/useDeepEffect/useDeepEffect";
const data = {1:[1]};
setInterval(() => {
  data[1].push(1);
},1000)
export default function App() {
  useDeepEffect(() => {
    console.log(data)
  },[data])
  return (
    <div className="App">
      <button onClick={() => }>刷新</button>
    </div>
  );
}
