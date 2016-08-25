namespace :pm2 do
  desc 'Restart pm2'
  task :restart do
    on roles(:web) do
      within fetch(:pm2_target_path, current_path) do
        execute "cd '#{current_path}'; pm2 restart sp"
      end
    end
  end
end
