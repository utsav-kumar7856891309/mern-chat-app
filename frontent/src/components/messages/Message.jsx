import { useAuthContext } from "../../context/AuthContext";
import { extractTime } from "../../utils/extractTime";
import useConversation from "../../zustand/useConversation";
import { Check, CheckCheck } from "lucide-react"; 

const Message = ({ message }) => {
	const { authUser } = useAuthContext();
	const { selectedConversation } = useConversation();
	const fromMe = message.senderId === authUser._id;
	const formattedTime = extractTime(message.createdAt);
	const chatClassName = fromMe ? "chat-end" : "chat-start";
	const profilePic = fromMe ? authUser.profilePic : selectedConversation?.profilePic;
	
	const bubbleBgColor = fromMe 
		? "bg-gradient-to-r from-blue-500 to-blue-600" 
		: "bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800";
	
	const textColor = fromMe ? "text-white" : "text-gray-900 dark:text-gray-100";
	
	const shakeClass = message.shouldShake ? "animate-[shake_0.5s_ease-in-out_2]" : "";

	return (
		<div className={`chat ${chatClassName} mb-4 last:mb-0 group`}>
			<div className='chat-image avatar'>
				<div className='w-10 h-10 rounded-full border-2 border-white dark:border-gray-700 overflow-hidden shadow-sm'>
					<img 
						alt='Profile picture' 
						src={profilePic} 
						className="object-cover w-full h-full"
						onError={(e) => {
							e.target.onerror = null;
							e.target.src = `https://ui-avatars.com/api/?name=${fromMe ? authUser.fullName : selectedConversation?.fullName}&background=random`;
						}}
					/>
				</div>
			</div>
			
			<div className={`chat-bubble ${bubbleBgColor} ${textColor} ${shakeClass} 
				px-4 py-3 
				max-w-xs md:max-w-md lg:max-w-lg
				rounded-2xl 
				shadow-sm
				transition-all duration-200
				hover:shadow-md
				${fromMe ? 'rounded-br-none' : 'rounded-bl-none'}
				relative
				group-hover:scale-[1.02]
				break-words
				whitespace-pre-wrap`}>
				{message.message}
				
				{fromMe && (
					<span className="absolute bottom-1 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
						{message.read ? (
							<CheckCheck className="w-3 h-3 text-blue-200" />
						) : (
							<Check className="w-3 h-3 text-blue-200" />
						)}
					</span>
				)}
			</div>
			
			<div className={`chat-footer mt-1 flex items-center gap-2 ${fromMe ? 'justify-end' : 'justify-start'}`}>
				<span className="text-xs opacity-60 text-gray-600 dark:text-gray-400 font-medium">
					{formattedTime}
				</span>
				
				
				{fromMe && message.read && (
					<span className="text-xs opacity-60 text-blue-500 dark:text-blue-400 italic">
						Seen
					</span>
				)}
			</div>
		</div>
	);
};

export default Message;