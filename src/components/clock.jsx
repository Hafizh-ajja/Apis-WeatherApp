import { useEffect, useState } from "react";

function Clock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="text-white text-xl font-semibold">
      {time.toLocaleTimeString("id-ID")}
    </div>
  );
}

export default Clock;