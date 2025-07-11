@@ .. @@
 function setupContactForm() {
-    // Account type change handler
-    const accountTypeOptions = document.querySelectorAll('input[name="accountType"]');
-    const companyField = document.querySelector('.company-field');
-    const nameLabel = document.getElementById('nameLabel');
-
-    accountTypeOptions.forEach(option => {
-        option.addEventListener('change', function() {
-            if (this.value === 'company') {
-                companyField.classList.remove('hidden');
-                nameLabel.textContent = 'do Responsável';
-            } else {
-                companyField.classList.add('hidden');
-                nameLabel.textContent = 'Completo';
-            }
-        });
-    });
+    // Form is now company-only, no dynamic changes needed
+    console.log('Contact form initialized for company-only access');
 }
 
@@ .. @@
     setTimeout(() => {
         alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
         e.target.reset();
-        
-        // Reset form state
-        document.querySelector('.company-field').classList.add('hidden');
-        document.getElementById('nameLabel').textContent = 'Completo';
-        document.querySelectorAll('.account-type-option').forEach(opt => opt.classList.remove('active'));
-        document.querySelector('.account-type-option').classList.add('active');
-        
         submitBtn.innerHTML = originalHTML;
         submitBtn.disabled = false;
     }, 1500);