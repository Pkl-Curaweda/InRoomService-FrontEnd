const { prisma } = require("../../config");

const resvRoom = [
	{
		roomId: 1,
		quantity: 1,
		note: "overlook must streetview",
		reservationId: 1,
		created_at: new Date(),
		updated_at: new Date(),
	},
];
async function ResvRoomSeed() {
	for (let ResvRoom of resvRoom) {
		await prisma.ResvRoom.create({
			data: ResvRoom,
		});
	}
}

module.exports = { ResvRoomSeed };
