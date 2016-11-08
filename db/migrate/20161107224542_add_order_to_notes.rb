class AddOrderToNotes < ActiveRecord::Migration[5.0]
  def change
    add_column :notes, :order, :integer
    add_column :notes, :importance, :integer
  end
end
