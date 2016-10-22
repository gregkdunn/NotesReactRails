class AddReplyToNotes < ActiveRecord::Migration[5.0]
  def change
    add_column :notes, :reply, :integer
    rename_column :notes, :type, :level
  end
end
