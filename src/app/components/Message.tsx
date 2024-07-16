import React from 'react'

interface msgProps {
    role: string;
    content: string;
}

const Message = (props : msgProps) => {
  const {role, content} = props;
  let a = (<div className="flex-1 overflow-y-auto p-6 space-y-4">
  <div className="flex items-start gap-4">
    <div className="bg-gray-100 dark:bg-gray-800 overflow-scroll rounded-lg p-3 max-w-[70%]">
      <div className="flex items-center gap-2 mb-1">
        <div className="font-medium">{"interviewer"}</div>
      </div>
      <p className="text-sm">{content}</p>
    </div>
  </div>
</div>)
if (role === "user") {
    a = (<div className="flex-1 overflow-y-auto p-6 space-y-4"><div className="flex items-start gap-4 justify-end">
    <div className="bg-blue-500 text-white overflow-scroll rounded-lg p-3 max-w-[70%]">
    <div className="flex items-center gap-2 mb-1">
        <div className="font-medium">{role}</div>
    </div>
    <p className="text-sm">{content}</p>
    </div>
</div>
</div>);
}
  return (
    <>
    {a}
    
  </>
  )
}

export default Message