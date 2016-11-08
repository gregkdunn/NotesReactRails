class NoteSerializer < ActiveModel::Serializer
  attributes :id, :title, :content, :importance, :created_at, :updated_at
end
