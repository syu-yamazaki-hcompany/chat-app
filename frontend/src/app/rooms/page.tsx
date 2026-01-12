import SideNav from "./_containers/parts/sideNav";
import TopTab from "./_containers/parts/topTab";
import RoomList from "./_containers/parts/roomList";
import ChatArea from "./_containers/chatArea/chatArea";

const ROOM_ID = "4a9eec10-222b-40e9-9461-9342ec0fe545";
const ADMIN_ID = "436d578e-da32-43f1-a812-9d2f656a179f";
const USER2_ID = "45ace999-9940-4a55-944d-2e32c9a216c0";

export default async function ChatPage({
  searchParams,
}: {
  searchParams: Promise<{ user?: string }>;
}) {
  const { user } = await searchParams;
  const currentUserId = user === "user2" ? USER2_ID : ADMIN_ID;

  return (
    <div className="flex h-screen w-full overflow-hidden">
      <SideNav />
      <div className="flex flex-col flex-1 min-h-0">
        <TopTab />
        <div className="flex flex-1 min-h-0">
          <RoomList />
          <ChatArea roomId={ROOM_ID} currentUserId={currentUserId} />
        </div>
      </div>
    </div>
  );
}
