var fmodal =
'<div class="block clearfix"> <div class="form-group" id="field1"> <label class="col-sm-4 control-label"> readiness Documentation </label> <div class="col-sm-8"> <select name="readinessDoc" id="readinessDoc" class="selectpicker form-control"> <option value="">-- Select Readiness Documentation --</option> <option value="YES">Yes</option> <option value="NO">No</option> <option value="NOT_APPLICABLE">Not Applicable</option> </select> </div> </div> <div class="form-group" id="field2"> <label class="col-sm-4 control-label"> readiness Sample </label> <div class="col-sm-8"> <select name="readinessSample" id="readinessSample" class="selectpicker form-control"> <option value="">-- Select Readiness Sample --</option> <option value="YES">Yes</option> <option value="NO">No</option> <option value="NOT_APPLICABLE">Not Applicable</option> </select> </div> </div> <div class="form-group" id="field3"> <label class="col-sm-4 control-label"> Submission Target </label> <div class="col-sm-8"> <input type="text" class="datepicker form-control" name="submissionTarget" id="submissionTarget" value=""> </div> </div> <div class="form-group" id="field4"> <label class="col-sm-4 control-label"> Submission Effective </label> <div class="col-sm-8"> <input type="text" class="datepicker form-control" name="submissionEffective" id="submissionEffective" value=""> </div> </div> <div class="form-group" id="field5"> <label class="col-sm-4 control-label"> Completion Target </label> <div class="col-sm-8"> <input type="text" class="datepicker form-control" name="completionTarget" id="completionTarget" value=""> </div> </div> <div class="form-group" id="field6"> <label class="col-sm-4 control-label"> Completion Effective </label> <div class="col-sm-8"> <input type="text" class="datepicker form-control" name="completionEffective" id="completionEffective" value=""> </div> </div> <div class="form-group" id="field7"> <label class="col-sm-4 control-label"> Report To </label> <div class="col-sm-8"> <input type="text" class="form-control" name="reportTo" id="reportTo" maxlength="120" value=""> </div> </div> <div class="form-group" id="field8"> <label class="col-sm-4 control-label"> Assign To </label> <div class="col-sm-8"> <div class="form-group clearfix"> <div class="col-sm-12"> <input type="text" class="form-control" placeholder="Type or select name of person to be assigned" id="assignToLabel" value=""> <input type="hidden" id="assignToId" name="assignToId" value=""> </div> <span style="font-size: 11px; margin-left: 5px;"> <span><img class="logo" src="/static/RvdA9a5lpziMFoJkWM56yoDQtK8HkPDKqFXdc75Tpfc.png" alt=""></span> Assigned person shall start receiving all messages related to project </span> </div> </div> </div> <div class="form-group" id="field9"> <label class="col-sm-4 control-label"> Comment </label> <div class="col-sm-8"> <textarea cols="50" rows="5" name="comment" id="comment" maxlength="499"></textarea> </div> </div> </div><input type=\"submit\" value=\"Submit\"> <script type="text/javascript" src="/static/65KJTeuX9zyxtJI4LJCEJkfZO8FcZGC3cjJVXWnAtCG.js"></script> <script type="text/javascript" src="/static/QgdnjOngJRvPdLjt4fRo9ItgPwH7eulw5fl1rhAejlL.js"></script> <style type="text/css"> .autocompleter { z-index: 1050 !important; } .datepicker { z-index: 1050 !important; } table { table-layout: auto !important; } </style> <script> $(document).ready(function(){ addAutoCompleteToAssignTo(\'\'); $(\'.selectpicker\').selectpicker(); }); </script>'