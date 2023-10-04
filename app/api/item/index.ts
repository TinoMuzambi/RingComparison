import { NextApiRequest, NextApiResponse } from "next";

import data from "@/data/rings.json";

const api = async (req: NextApiRequest, res: NextApiResponse) => {
	const { method } = req;

	switch (method) {
		case "GET":
			try {
				res.status(200).json({ success: true, data });
			} catch (error) {
				console.error(error);

				res.status(400).json({ success: false, data: error });
			}
			break;
		default:
			return res.status(400).json({ success: false });
	}
};
export default api;
