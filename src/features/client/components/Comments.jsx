import { useState } from "react";
import { useComments } from "../hooks/useComments";
import { loggedUser } from "../../../shared/utils";
import { RiDeleteBin5Fill, RiEdit2Fill } from "react-icons/ri";

// Simulación del usuario en sesión (Temporal)
const loggedInUser = loggedUser();

export const Comments = ({ event, handleCommentsChange }) => {
  const { createComment, editComment, deleteComment, isSubmitting, error } = useComments();
  const [newComment, setNewComment] = useState('');
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editedContent, setEditedContent] = useState('');

  // Crear un nuevo comentario
  const handleCreateComment = async () => {
    if (!newComment.trim()) return;

    const commentData = {
      userId: loggedInUser.id,
      eventId: event.data.id,
      content: newComment.trim(),
    };

    await createComment(commentData);
    setNewComment('');
    if (handleCommentsChange) handleCommentsChange(); // Notificar al componente padre
  };

  // Editar un comentario
  const handleEditComment = async (commentId) => {
    if (!editedContent.trim()) return;

    const commentData = {
      content: editedContent.trim(),
      userId: loggedInUser.id,
      eventId: event.data.id,
    };

    await editComment(commentId, commentData);
    setEditingCommentId(null);
    setEditedContent('');
    if (handleCommentsChange) handleCommentsChange(); // Notificar al componente padre
  };

  // Eliminar un comentario
  const handleDeleteComment = async (commentId) => {
    await deleteComment(commentId);
    if (handleCommentsChange) handleCommentsChange(); // Notificar al componente padre
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4">Comentarios</h2>
      <ul className="divide-y divide-gray-200">
        {event.data.comments && event.data.comments.length > 0 ? (
          event.data.comments.map((comment) => (
            <li key={comment.id} className="bg-gray-200 rounded-md my-2 p-4 flex justify-between items-start">
              <div className="flex-1">
                <p className="font-semibold">{comment.userName}</p>
                {editingCommentId === comment.id ? (
                  <div>
                    <textarea
                      className="w-full p-2 mt-2 border rounded-lg resize-none"
                      style={{ minHeight: '100px' }} // Ajusta la altura mínima
                      value={editedContent}
                      onChange={(e) => setEditedContent(e.target.value)}
                    />
                    <button
                      className="mt-2 mr-2 px-5 py-2 bg-green-500 text-white rounded-lg hover:bg-green-700"
                      onClick={() => handleEditComment(comment.id)}
                      disabled={isSubmitting}
                    >
                      Guardar
                    </button>
                    <button
                      className="mt-2 px-5 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-700"
                      onClick={() => {
                        setEditingCommentId(null);
                        setEditedContent('');
                      }}
                      disabled={isSubmitting}
                    >
                      Cancelar
                    </button>
                  </div>
                ) : (
                  <div>
                    <p className="text-gray-800">{comment.content}</p>
                    <p className="text-sm text-gray-500 mt-1">{new Date(comment.publicationDate).toLocaleDateString()}</p>
                  </div>
                )}
              </div>
              {comment.userId === loggedInUser.id && (
                <div className="flex space-x-2">
                  {editingCommentId === comment.id ? null : (
                    <>
                      <button
                        className="p-2 text-xl bg-green-500 text-white rounded-full hover:bg-green-700"
                        onClick={() => {
                          setEditingCommentId(comment.id);
                          setEditedContent(comment.content);
                        }}
                        disabled={isSubmitting}
                      >
                        <RiEdit2Fill />
                      </button>
                      <button
                        className="p-2 text-xl bg-red-500 text-white rounded-full hover:bg-red-700"
                        onClick={() => handleDeleteComment(comment.id)}
                        disabled={isSubmitting}
                      >
                        <RiDeleteBin5Fill />
                      </button>
                    </>
                  )}
                </div>
              )}
            </li>
          ))
        ) : (
          <p>No hay comentarios todavía.</p>
        )}
      </ul>
      <div className="mt-4">
        <textarea
          className="w-full p-4 border rounded-lg"
          placeholder="Escribe un comentario..."
          rows="4"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button
          className="mt-2 px-10 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
          onClick={handleCreateComment}
          disabled={isSubmitting}
        >
          Enviar
        </button>
      </div>
      {error && <p className="text-red-500 mt-4">{error.message}</p>}
    </div>
  );
};
