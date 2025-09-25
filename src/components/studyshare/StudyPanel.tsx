'use client';

import { StudyNote, Comment } from '@/types/studyshare';
import { formatTimeAgo, formatDuration } from '@/lib/utils';
import {
  BookmarkPlus,
  MessageCircle,
  Share2,
  Clock,
  FileText,
  Send,
  Trash2,
  Edit
} from 'lucide-react';
import { useState } from 'react';

interface StudyPanelProps {
  videoId: string;
  notes: StudyNote[];
  comments: Comment[];
  onAddNote?: (note: Omit<StudyNote, 'id' | 'createdAt'>) => void;
  onAddComment?: (comment: Omit<Comment, 'id' | 'createdAt' | 'replies' | 'likes' | 'user'>) => void;
  onDeleteNote?: (noteId: string) => void;
  className?: string;
}

export function StudyPanel({
  videoId,
  notes,
  comments,
  onAddNote,
  onAddComment,
  onDeleteNote,
  className = ''
}: StudyPanelProps) {
  const [activeTab, setActiveTab] = useState<'notes' | 'comments'>('notes');
  const [newNote, setNewNote] = useState('');
  const [newComment, setNewComment] = useState('');
  const [noteTimestamp, setNoteTimestamp] = useState(0);

  const handleAddNote = () => {
    if (!newNote.trim()) return;

    onAddNote?.({
      videoId,
      userId: 'current-user', // This would come from auth context
      timestamp: noteTimestamp,
      content: newNote,
      isPublic: false
    });

    setNewNote('');
  };

  const handleAddComment = () => {
    if (!newComment.trim()) return;

    onAddComment?.({
      videoId,
      userId: 'current-user', // This would come from auth context
      content: newComment
    });

    setNewComment('');
  };

  const getCurrentTimestamp = () => {
    // In a real implementation, this would get the current video playback time
    return Math.floor(Math.random() * 3600); // Mock timestamp
  };

  const jumpToTimestamp = (timestamp: number) => {
    // In a real implementation, this would seek the video player to the timestamp
    console.log(`Jumping to ${timestamp}s`);
  };

  return (
    <div className={`study-panel ${className}`}>
      {/* Tab Headers */}
      <div className="border-b border-gray-200">
        <div className="flex">
          <button
            onClick={() => setActiveTab('notes')}
            className={`flex-1 py-3 px-4 text-sm font-medium text-center border-b-2 transition-colors ${
              activeTab === 'notes'
                ? 'border-orange-500 text-orange-600 bg-orange-50'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            <FileText className="inline-block h-4 w-4 mr-2" />
            Notes ({notes.length})
          </button>
          <button
            onClick={() => setActiveTab('comments')}
            className={`flex-1 py-3 px-4 text-sm font-medium text-center border-b-2 transition-colors ${
              activeTab === 'comments'
                ? 'border-orange-500 text-orange-600 bg-orange-50'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            <MessageCircle className="inline-block h-4 w-4 mr-2" />
            Comments ({comments.length})
          </button>
        </div>
      </div>

      {/* Tab Content */}
      <div className="p-4">
        {activeTab === 'notes' && (
          <div className="space-y-4">
            {/* Add Note Form */}
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-2">
                <button
                  onClick={() => setNoteTimestamp(getCurrentTimestamp())}
                  className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded"
                >
                  <Clock className="inline h-3 w-3 mr-1" />
                  {formatDuration(noteTimestamp)}
                </button>
              </div>
              <textarea
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                placeholder="Add a note at this timestamp..."
                className="w-full p-2 border border-gray-200 rounded text-sm resize-none"
                rows={2}
              />
              <div className="flex justify-end mt-2">
                <button
                  onClick={handleAddNote}
                  disabled={!newNote.trim()}
                  className="bg-orange-500 text-white px-3 py-1 rounded text-sm hover:bg-orange-600 disabled:opacity-50"
                >
                  <Send className="inline h-3 w-3 mr-1" />
                  Add Note
                </button>
              </div>
            </div>

            {/* Notes List */}
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {notes.map((note) => (
                <div key={note.id} className="bg-white border border-gray-200 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <button
                      onClick={() => jumpToTimestamp(note.timestamp)}
                      className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded hover:bg-blue-200"
                    >
                      <Clock className="inline h-3 w-3 mr-1" />
                      {formatDuration(note.timestamp)}
                    </button>
                    <div className="flex gap-1">
                      <button className="text-gray-400 hover:text-gray-600">
                        <Edit className="h-3 w-3" />
                      </button>
                      <button
                        onClick={() => onDeleteNote?.(note.id)}
                        className="text-gray-400 hover:text-red-600"
                      >
                        <Trash2 className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                  <p className="text-sm text-gray-700 academic-body">{note.content}</p>
                  <p className="text-xs text-gray-500 mt-2">{formatTimeAgo(note.createdAt)}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'comments' && (
          <div className="space-y-4">
            {/* Add Comment Form */}
            <div className="bg-gray-50 rounded-lg p-3">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Share your thoughts about this video..."
                className="w-full p-2 border border-gray-200 rounded text-sm resize-none"
                rows={2}
              />
              <div className="flex justify-end mt-2">
                <button
                  onClick={handleAddComment}
                  disabled={!newComment.trim()}
                  className="bg-orange-500 text-white px-3 py-1 rounded text-sm hover:bg-orange-600 disabled:opacity-50"
                >
                  <Send className="inline h-3 w-3 mr-1" />
                  Comment
                </button>
              </div>
            </div>

            {/* Comments List */}
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {comments.map((comment) => (
                <div key={comment.id} className="bg-white border border-gray-200 rounded-lg p-3">
                  <div className="flex items-start gap-3">
                    <img
                      src={comment.user.avatar}
                      alt={comment.user.name}
                      className="h-8 w-8 rounded-full"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-sm">{comment.user.name}</span>
                        <span className="text-xs text-gray-500">{comment.user.university}</span>
                        <span className="text-xs text-gray-400">•</span>
                        <span className="text-xs text-gray-500">{formatTimeAgo(comment.createdAt)}</span>
                      </div>
                      <p className="text-sm text-gray-700 academic-body">{comment.content}</p>
                      {comment.timestamp && (
                        <button
                          onClick={() => jumpToTimestamp(comment.timestamp!)}
                          className="text-xs text-blue-600 hover:text-blue-800 mt-1"
                        >
                          <Clock className="inline h-3 w-3 mr-1" />
                          {formatDuration(comment.timestamp)}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}