# GraphQL設計 チャットルーム作成・参加・招待機能

## Query / Mutation

| 種類     | 名称                                                        | 説明                                       |
| -------- | ----------------------------------------------------------- | ------------------------------------------ |
| Query    | `joinedRooms: [RoomModel!]!`                                | ログインユーザーが参加中のルーム一覧       |
| Query    | `unjoinedRooms: [RoomModel!]!`                              | ログインユーザーが参加していないルーム一覧 |
| Query    | `roomDetail(roomId: ID!): RoomDetailModel`                  | ルームの詳細情報（メンバー一覧など）       |
| Mutation | `createRoom(input: CreateRoomInput!): RoomModel!`           | ルーム作成                                 |
| Mutation | `joinRoom(roomId: ID!): RoomMemberModel!`                   | ルームに参加                               |
| Mutation | `inviteToRoom(input: InviteToRoomInput!): RoomMemberModel!` | 他ユーザーをルームに招待                   |
| Mutation | `leaveRoom(roomId: ID!): Boolean!`                          | ルームから退出（論理削除）                 |

## Type

| 種類 | 名称            | 内容                                       |
| ---- | --------------- | ------------------------------------------ |
| Type | RoomModel       | ルーム基本情報（一覧表示用）               |
| Type | RoomDetailModel | ルーム詳細情報（チャットルームでの表示用） |
| Type | RoomMemberModel | ルームメンバー情報                         |
| Type | UserModel       | ユーザー情報                               |
| Enum | Role            | ユーザー権限                               |

### RoomModel

ルーム基本情報（一覧表示用）

```graphql
type RoomModel {
  id: ID!           "ルームID"
  name: String!     "ルーム名"
}
```

### RoomDetailModel

ルーム詳細情報（チャットルームでの表示用）

```graphql
type RoomDetailModel {
  id: ID!                         "ルームID"
  name: String!                   "ルーム名"
  members: [RoomMemberModel!]!    "アクティブなメンバーのみ"
}
```

### RoomMemberModel

ルームメンバー情報

```graphql
type RoomMemberModel {
  roomId: ID!         "ルームID"
  userId: ID!         "ユーザーID"
  role: Role!         "権限"
  joinedAt: DateTime! "参加日時"
  user: UserModel!    "ユーザー情報"
  invitedBy: ID       "招待したユーザーのID（自分で参加した場合はnull）"
  inviter: UserModel  "招待したユーザー情報（自分で参加した場合はnull）"
}
```

### UserModel

ユーザー情報

```graphql
type UserModel {
  id: ID!
  name: String
}
```

### Role

ユーザー権限

```graphql
enum Role {
  ADMIN
  MEMBER
}
```

## Input

| 種類  | 名称              | 内容               |
| ----- | ----------------- | ------------------ |
| Input | CreateRoomInput   | ルーム作成用データ |
| Input | InviteToRoomInput | ルーム招待用データ |

### CreateRoomInput

```graphql
input CreateRoomInput {
  name: String!   "ルーム名"
}
```

### InviteToRoomInput

```graphql
input InviteToRoomInput {
  roomId: ID!     "招待先ルームID"
  userId: ID!     "招待する対象のユーザーID"
}
```

## 実行イメージ

```
1.チャットルームの作成
   └─ createRoomを叩く → 作成後、joinedRoomsを再取得

2.参加していないルームへ参加する機能
   └─ joinRoomを叩く → 参加後、joinedRoomsとunjoinedRoomsを再取得

3.招待する機能
   └─ inviteToRoomを叩く → roomDetailを再取得してチャットルーム内のメンバー表示更新

4.参加済み・未参加のルーム取得
   └─ joinedRoomsとunjoinedRoomsを叩く → サイドバーに参加中・未参加のルームを表示

5. 退出
   └─ leaveRoomを叩く → 退出後、joinedRoomsとunjoinedRoomsを再取得
```

## 参考：関連するDB設計

現行の内容から変更する必要はなさそうでした。

### Room

```prisma
model Room {
  id        String   @id @default(uuid())
  name      String
  createdBy String   @map("created_by")
  isPrivate Boolean  @default(false) @map("is_private")
  createdAt DateTime @default(now()) @map("created_at")
  updatedAt DateTime @updatedAt @map("updated_at")

  creator     User         @relation("RoomCreatedBy", fields: [createdBy], references: [id])
  messages    Message[]
  roomMembers RoomMember[]
}
```

### RoomMember

```prisma
model RoomMember {
  roomId    String   @map("room_id")
  userId    String   @map("user_id")
  role      Role     @default(MEMBER)
  invitedBy String?  @map("invited_by")
  isActive  Boolean  @default(true) @map("is_active")
  joinedAt  DateTime @default(now()) @map("joined_at")

  room    Room  @relation(fields: [roomId], references: [id])
  user    User  @relation(fields: [userId], references: [id])
  inviter User? @relation("InvitedBy", fields: [invitedBy], references: [id])

  @@id([roomId, userId])
}
```

### User（今回の実装と関係ないフィールドは省略）

```prisma
model User {
  id            String    @id @default(uuid())
  name          String
  email         String    @unique

  roomMembers    RoomMember[]
  createdRooms   Room[]       @relation("RoomCreatedBy")
  invitedMembers RoomMember[] @relation("InvitedBy")
}
```
