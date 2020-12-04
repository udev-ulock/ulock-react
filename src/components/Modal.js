function Modal({isVisible, title, body, setIsModalVisible}) {
    return (
    <div id="modal" className={isVisible ? "" : "hidden"}>
        <div id="modal-window">
            <h3>{title}</h3>
            <p>{body}</p>
            <button className="color-wide" onClick={()=>setIsModalVisible(false)}>OK</button>
        </div>
    </div>);
}

export default Modal;
