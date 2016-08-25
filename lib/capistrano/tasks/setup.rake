namespace :setup do
  desc 'Upload config files.'
  task :upload_config do
    on roles(:web) do
      execute "mkdir -p #{shared_path}/config"
      upload! StringIO.new(File.read('config/config.js')), "#{shared_path}/config/config.js"
    end
  end
end