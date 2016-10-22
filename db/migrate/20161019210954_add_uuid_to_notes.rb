class AddUuidToNotes < ActiveRecord::Migration[5.0]
  def change
    add_column :notes, :uuid, :string
  end
end
