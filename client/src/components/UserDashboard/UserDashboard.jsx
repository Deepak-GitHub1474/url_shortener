import CreateShortUrl from "./CreateShortUrl/CreateShortUrl";
import GetShortUrl from "./GetShortUrl/GetShortUrl";

const UserDashboard = () => {

  return (
    <main className="flex flex-wrap justify-center gap-10 sm:px-24 px-2 py-8">
        <CreateShortUrl />
        <GetShortUrl />
    </main>
  );
};

export default UserDashboard;
