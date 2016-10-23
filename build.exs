# Build Script
File.rm_rf("dist")
File.rm("dist.zip")

File.mkdir_p!("dist/source")
File.mkdir_p!("dist/vendor")
File.mkdir_p!("dist/admin")

File.cp!("checkout-field-editor.php", "dist/checkout-field-editor.php")
File.cp_r!("source", "dist/source")
File.cp_r!("vendor/composer", "dist/vendor/composer/")
File.cp_r!("admin/build", "dist/admin/build")

:zip.create('dist.zip', ['dist'])