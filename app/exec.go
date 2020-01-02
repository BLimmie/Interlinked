package app

import "os/exec"

func RunCommand(cmd exec.Cmd) error {
	if err := cmd.Start(); err != nil {
		return  err
	}
	err := cmd.Wait()
	return err
}
