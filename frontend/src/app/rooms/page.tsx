import SideNav from "./_containers/parts/sideNav";
import TopTab from "./_containers/parts/topTab";
import RoomList from "./_containers/parts/roomList";
import ChatArea from "./_containers/chatArea/chatArea";

const ROOM_ID = "357422c8-e2cf-4a7c-8481-261a0df03bc4";
const ADMIN_ID = "af802d5c-539c-4c2a-a841-b1cdc2df3d52";
const USER2_ID = "d41af4c0-8801-4c4f-bd14-1860d69f09a6";

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
