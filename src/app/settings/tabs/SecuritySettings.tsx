import React, { useState, ChangeEvent } from "react";
import { Eye, EyeOff, Mail, Lock, RefreshCw } from "lucide-react";
import { toast } from "react-hot-toast";

const SecuritySettings = () => {
  const [email, setEmail] = useState("user@example.com");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState("");
  const [isSendingResetLink, setIsSendingResetLink] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  
  const [formErrors, setFormErrors] = useState({
    email: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    forgotPasswordEmail: ""
  });

  // Password requirements
  const passwordRequirements = [
    { id: 1, text: "At least 8 characters" },
    { id: 2, text: "Contains at least one uppercase letter" },
    { id: 3, text: "Contains at least one number" },
    { id: 4, text: "Contains at least one special character" }
  ];

  // Email validation
  const validateEmail = (email: string, field: "email" | "forgotPasswordEmail" = "email") => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      setFormErrors(prev => ({ ...prev, [field]: "Email is required" }));
      return false;
    } else if (!emailRegex.test(email)) {
      setFormErrors(prev => ({ ...prev, [field]: "Please enter a valid email address" }));
      return false;
    } else {
      setFormErrors(prev => ({ ...prev, [field]: "" }));
      return true;
    }
  };

  // Password validation
  const validatePassword = (name: string, value: string) => {
    if (name === "currentPassword") {
      if (!value) {
        setFormErrors(prev => ({ ...prev, currentPassword: "Current password is required" }));
        return false;
      } else {
        setFormErrors(prev => ({ ...prev, currentPassword: "" }));
        return true;
      }
    } else if (name === "newPassword") {
      // Check password strength
      const minLength = value.length >= 8;
      const hasUpperCase = /[A-Z]/.test(value);
      const hasNumber = /[0-9]/.test(value);
      const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value);
      
      if (!value) {
        setFormErrors(prev => ({ ...prev, newPassword: "New password is required" }));
        return false;
      } else if (!(minLength && hasUpperCase && hasNumber && hasSpecialChar)) {
        setFormErrors(prev => ({ 
          ...prev, 
          newPassword: "Password doesn't meet requirements" 
        }));
        return false;
      } else {
        setFormErrors(prev => ({ ...prev, newPassword: "" }));
        return true;
      }
    } else if (name === "confirmPassword") {
      if (!value) {
        setFormErrors(prev => ({ ...prev, confirmPassword: "Please confirm your password" }));
        return false;
      } else if (value !== newPassword) {
        setFormErrors(prev => ({ ...prev, confirmPassword: "Passwords do not match" }));
        return false;
      } else {
        setFormErrors(prev => ({ ...prev, confirmPassword: "" }));
        return true;
      }
    }
    return false;
  };

  // Handle input change
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    if (name === "email") {
      setEmail(value);
      validateEmail(value);
    } else if (name === "currentPassword") {
      setCurrentPassword(value);
      validatePassword(name, value);
    } else if (name === "newPassword") {
      setNewPassword(value);
      validatePassword(name, value);
      
      // If confirm password is already filled, validate it against the new password
      if (confirmPassword) {
        validatePassword("confirmPassword", confirmPassword);
      }
    } else if (name === "confirmPassword") {
      setConfirmPassword(value);
      validatePassword(name, value);
    } else if (name === "forgotPasswordEmail") {
      setForgotPasswordEmail(value);
      validateEmail(value, "forgotPasswordEmail");
    }
  };

  // Handle forgot password click
  const handleForgotPasswordToggle = () => {
    setShowForgotPassword(!showForgotPassword);
    if (!showForgotPassword) {
      setForgotPasswordEmail(email);
    }
  };

  // Handle sending password reset link
  const handleSendResetLink = () => {
    if (validateEmail(forgotPasswordEmail, "forgotPasswordEmail")) {
      setIsSendingResetLink(true);
      // Simulate API call
      setTimeout(() => {
        setIsSendingResetLink(false);
        toast.success("Password reset link has been sent to your email");
        setShowForgotPassword(false);
      }, 1500);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Security Settings</h2>
      
      <div className="space-y-8">
        {/* Email Settings */}
        <div className="space-y-4">
          <h3 className="text-md font-medium flex items-center">
            <Mail className="h-5 w-5 mr-2 text-gray-500" />
            Email Address
          </h3>
          
          <div className="p-4 border border-gray-200 rounded-md space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={handleInputChange}
                onBlur={(e) => validateEmail(e.target.value)}
                className={`w-full px-3 py-2 border ${formErrors.email ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                placeholder="Enter your email address"
              />
              {formErrors.email && (
                <p className="mt-1 text-sm text-red-500">{formErrors.email}</p>
              )}
            </div>
            
            <p className="text-xs text-gray-500">
              Your email is used for account notifications and password resets
            </p>
          </div>
        </div>
        
        {/* Password Management */}
        <div className="space-y-4">
          <h3 className="text-md font-medium flex items-center">
            <Lock className="h-5 w-5 mr-2 text-gray-500" />
            Password
          </h3>
          
          <div className="p-4 border border-gray-200 rounded-md space-y-4">
            {!showForgotPassword ? (
              <>
                <div>
                  <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-1">
                    Current Password <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      id="currentPassword"
                      name="currentPassword"
                      type={showCurrentPassword ? "text" : "password"}
                      value={currentPassword}
                      onChange={handleInputChange}
                      onBlur={(e) => validatePassword("currentPassword", e.target.value)}
                      className={`w-full px-3 py-2 border ${formErrors.currentPassword ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10`}
                      placeholder="Enter current password"
                    />
                    <button 
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                      aria-label={showCurrentPassword ? "Hide password" : "Show password"}
                    >
                      {showCurrentPassword ? 
                        <EyeOff className="h-4 w-4 text-gray-400" /> : 
                        <Eye className="h-4 w-4 text-gray-400" />
                      }
                    </button>
                  </div>
                  {formErrors.currentPassword && (
                    <p className="mt-1 text-sm text-red-500">{formErrors.currentPassword}</p>
                  )}
                  <button 
                    onClick={handleForgotPasswordToggle}
                    className="mt-2 text-sm text-blue-600 hover:text-blue-800"
                  >
                    Forgot password?
                  </button>
                </div>
                
                <div>
                  <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
                    New Password <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      id="newPassword"
                      name="newPassword"
                      type={showNewPassword ? "text" : "password"}
                      value={newPassword}
                      onChange={handleInputChange}
                      onBlur={(e) => validatePassword("newPassword", e.target.value)}
                      className={`w-full px-3 py-2 border ${formErrors.newPassword ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10`}
                      placeholder="Enter new password"
                    />
                    <button 
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      aria-label={showNewPassword ? "Hide password" : "Show password"}
                    >
                      {showNewPassword ? 
                        <EyeOff className="h-4 w-4 text-gray-400" /> : 
                        <Eye className="h-4 w-4 text-gray-400" />
                      }
                    </button>
                  </div>
                  {formErrors.newPassword && (
                    <p className="mt-1 text-sm text-red-500">{formErrors.newPassword}</p>
                  )}
                  
                  {/* Password requirements */}
                  <div className="mt-2">
                    <p className="text-xs text-gray-500 mb-1">Password requirements:</p>
                    <ul className="text-xs text-gray-500 space-y-1 pl-5 list-disc">
                      {passwordRequirements.map(req => (
                        <li key={req.id}>{req.text}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                    Confirm New Password <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={handleInputChange}
                      onBlur={(e) => validatePassword("confirmPassword", e.target.value)}
                      className={`w-full px-3 py-2 border ${formErrors.confirmPassword ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10`}
                      placeholder="Confirm new password"
                    />
                    <button 
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                    >
                      {showConfirmPassword ? 
                        <EyeOff className="h-4 w-4 text-gray-400" /> : 
                        <Eye className="h-4 w-4 text-gray-400" />
                      }
                    </button>
                  </div>
                  {formErrors.confirmPassword && (
                    <p className="mt-1 text-sm text-red-500">{formErrors.confirmPassword}</p>
                  )}
                </div>
              </>
            ) : (
              <div className="bg-blue-50 p-4 rounded-md">
                <h4 className="text-sm font-medium text-blue-800 mb-3">Reset Password</h4>
                <p className="text-sm text-gray-600 mb-4">
                  Enter your email address below and we'll send you a link to reset your password.
                </p>
                
                <div className="mb-4">
                  <label htmlFor="forgotPasswordEmail" className="block text-sm font-medium text-gray-700 mb-1">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="forgotPasswordEmail"
                    name="forgotPasswordEmail"
                    type="email"
                    value={forgotPasswordEmail}
                    onChange={handleInputChange}
                    onBlur={(e) => validateEmail(e.target.value, "forgotPasswordEmail")}
                    className={`w-full px-3 py-2 border ${formErrors.forgotPasswordEmail ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    placeholder="Enter your email address"
                  />
                  {formErrors.forgotPasswordEmail && (
                    <p className="mt-1 text-sm text-red-500">{formErrors.forgotPasswordEmail}</p>
                  )}
                </div>
                
                <div className="flex items-center gap-3">
                  <button 
                    onClick={handleSendResetLink}
                    disabled={isSendingResetLink}
                    className={`px-4 py-2 ${isSendingResetLink ? 'bg-gray-400' : 'bg-[#0B51A6] hover:bg-blue-700'} text-white rounded-md text-sm flex items-center`}
                  >
                    {isSendingResetLink && <RefreshCw className="h-4 w-4 mr-2 animate-spin" />}
                    {isSendingResetLink ? "Sending..." : "Send Reset Link"}
                  </button>
                  <button 
                    onClick={handleForgotPasswordToggle}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md text-sm hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecuritySettings; 