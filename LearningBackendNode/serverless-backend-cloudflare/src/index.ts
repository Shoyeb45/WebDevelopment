

export default {
	async fetch(request: Request, env, ctx): Promise<Response> {
			
		console.log(request.url);
		
		
		if (request.method === "GET") {
			return Response.json({
				message: "You hit get request"
			});
		}
		
		return Response.json({
			message: "You did not hit get request"
		});
	},
} satisfies ExportedHandler<Env>;
